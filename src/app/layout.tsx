import { Provider } from "@/components/ui/provider"
import { ApolloWrapper } from "./ApolloWrapper";

export default function RootLayout(props: { children: React.ReactNode }) {
    const { children } = props
    return (
        <html suppressHydrationWarning>
            <body>
                <ApolloWrapper><Provider>{children}</Provider></ApolloWrapper>
            </body>
        </html>
    )
}