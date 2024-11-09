"use client"

import {
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
    DialogCloseTrigger,
} from "@/components/ui/dialog"
import AnimeCard from '@/components/AnimeCard'


export default function AnimeModal(props: {
    isClosed: boolean,
    media: { coverImage: {medium: string}, title: {romaji: string}, description: string}
    setIsClosed: (isClosed: boolean) => void
}) {
    if (props.isClosed) {
        return null
    }

    return (
        <DialogRoot open={!props.isClosed} closeOnInteractOutside>
            <DialogTrigger />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle />
                </DialogHeader>
                <DialogBody>
                    <AnimeCard media={props.media} isMini={false} />
                </DialogBody>
                <DialogFooter />
                <DialogCloseTrigger onClick={() => props.setIsClosed(true)} />
            </DialogContent>
        </DialogRoot>
    );
}
