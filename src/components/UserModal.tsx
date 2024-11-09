import {
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input, Fieldset } from "@chakra-ui/react"
import { useState, useEffect } from "react"

export default function UserModal(props: {
    username: string | undefined,
    jobTitle: string | undefined,
    isClosed: boolean,
    onSave: (username: string, jobTitle: string) => void,
    setIsClosed: (isClosed: boolean) => void

}) {
    const [username, setUsername] = useState(props.username || '')
    const [jobTitle, setJobTitle] = useState(props.jobTitle || '')

    useEffect(() => {
        setUsername(props.username || '')
        setJobTitle(props.jobTitle || '')
    }, [props.username, props.jobTitle])

    const onSave = () => {
        props.onSave(username, jobTitle)
        props.setIsClosed(true)
    }

    const shouldBeOpen = !props.username || !props.jobTitle

    if (props.isClosed && !shouldBeOpen) {
        return null
    }

    return (
        <DialogRoot closeOnEscape={false} closeOnInteractOutside={false} defaultOpen>
            <DialogTrigger />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle />
                </DialogHeader>
                <DialogBody>
                    <Fieldset.Root>
                        <Fieldset.Content>
                            <Field label='Username'>
                                <Input placeholder='CoolDragon' value={username} onChange={(e) => setUsername(e.target.value)} />
                            </Field>
                            <Field label='Job title'>
                                <Input placeholder='Lion Slayer' value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                            </Field>
                            <Button onClick={onSave}>Save</Button>
                        </Fieldset.Content>
                    </Fieldset.Root>
                </DialogBody>
                <DialogFooter />
            </DialogContent>
        </DialogRoot>
    );
}
