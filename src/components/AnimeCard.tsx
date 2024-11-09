import { Card, Image, Center, Flex } from "@chakra-ui/react"
import { DataListItem, DataListRoot } from "@/components/ui/data-list"


export default function AnimeCard(props: {
    isMini: boolean,
    media: { coverImage: {medium: string}, title: {romaji: string}, description: string}
}) {
    return (
        <Card.Root size="sm" maxW={props.isMini ? "200px" : ''} width={props.isMini ? "200px" : ''} overflow="hidden" minH='300px'>
            <Image
                rounded="md"
                h="200px"
                fit="contain"
                src={props.media.coverImage.medium}
                alt={props.media.title.romaji}
            />
            <Card.Body>
                <Center>
                    <Card.Title><Flex>{props.media.title.romaji}</Flex></Card.Title>
                </Center>
                {!props.isMini &&
                        <DataListRoot orientation="horizontal">
                             <DataListItem label='Description' value={props.media.description} />
                        </DataListRoot>
                    }
            </Card.Body>
            <Card.Footer />
        </Card.Root>
    )
}