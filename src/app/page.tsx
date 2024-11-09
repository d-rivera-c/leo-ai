"use client"

import { useState, use, useEffect } from "react"
import { DiAptana } from "react-icons/di";
import UserModal from '@/components/UserModal'
import AnimeCard from '@/components/AnimeCard'
import AnimeModal from '@/components/AnimeModal'
import { Flex, HStack, Box, Center } from "@chakra-ui/react"
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from "@/components/ui/pagination"
import { usePathname, useRouter } from 'next/navigation';
import { useLazyQuery } from "@apollo/client";
import { GET_MEDIA } from '@/queries/getMedia'

export default function Page(props: {
    searchParams: Promise<{
      page?: string;
    }>;
  }) {
    const searchParams = use(props.searchParams);
    const pathname = usePathname();
    const { replace } = useRouter();

    const [storage, setStorage] = useState<{ username: string; jobTitle: string }>()
    const [username, setUsername] = useState<string>()
    const [jobTitle, setJobTitle] = useState<string>()

    const [isUserModalClosed, setIsUserModalClosed] = useState(true)
    const [isAnimeModalClosed, setIsAnimeModalClosed] = useState(true)
    const [media, setMedia] = useState<{ coverImage: {medium: string}, title: {romaji: string}, description: string}>({
        coverImage: {medium: ''},
        title: { romaji: ''},
        description: ''
    })
    const [page, setPage] = useState(Number(searchParams?.page) || 1)
    const [getMedia, { loading, error, data }] = useLazyQuery(GET_MEDIA, {
        variables: {
            page: page,
            perPage: 6,
        }
    });

    useEffect(() => {
        setStorage(JSON.parse(localStorage.getItem('leo-ai') ?? '{}'))
    }, [])
    useEffect(() => {
        setUsername(storage?.username)
        setJobTitle(storage?.jobTitle)

        if (storage?.username && storage?.jobTitle) {
            getMedia()
        }
    }, [storage, getMedia])

    const onUserSave = (username: string, jobTitle: string) => {
        localStorage.setItem('leo-ai', JSON.stringify({ username: username, jobTitle: jobTitle }))
        setUsername(username)
        setJobTitle(jobTitle)
        if (username && jobTitle) {
            getMedia()
        }
    }

    const handlePageChange = (pageIndex: number) => {
        setPage(pageIndex)

        const params = new URLSearchParams(searchParams);
        if (pageIndex !== 1) {
          params.set('page', pageIndex.toString());
        } else {
          params.delete('page');
        }
        replace(`${pathname}?${params.toString()}`);
    }


    if (!storage) {
        return null
    }

    return (
        <>
            <UserModal isClosed={isUserModalClosed} setIsClosed={setIsUserModalClosed} username={username} jobTitle={jobTitle} onSave={onUserSave} />
            <AnimeModal isClosed={isAnimeModalClosed} setIsClosed={setIsAnimeModalClosed} media={media} />

            <Box padding="4">
                <Flex justifyContent={'flex-end'} alignItems={'center'}>
                    <div>{username} - {jobTitle}</div>
                    <DiAptana onClick={() => setIsUserModalClosed(false)} />
                </Flex>
            </Box>

            <Flex gap="2" justify="center" wrap="wrap" alignContent={'stretch'}>
                {error && <p>Error : {error.message}</p>}
                {loading && <Box minH='200px'>Loading...</Box>}
                {data?.Page?.media?.map((media: { coverImage: {medium: string}, title: {romaji: string}, description: string}) => (
                    <div key={media.title.romaji} onClick={() => { setIsAnimeModalClosed(false); setMedia(media) }} style={{ cursor: 'pointer' }}>
                        <AnimeCard media={media} isMini />
                    </div>
                ))}
            </Flex>

            <Box padding="4">
                <Center>
                    <PaginationRoot
                        count={500}
                        page={page}
                        onPageChange={(e) => handlePageChange(e.page)}
                    >
                        <HStack>
                            <PaginationPrevTrigger />
                            <PaginationItems />
                            <PaginationNextTrigger />
                        </HStack>
                    </PaginationRoot>
                </Center>
            </Box>
        </>
    );
}
