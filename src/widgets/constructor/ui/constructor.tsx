import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/shared/ui/tabs"

export const Constructor: React.FC = () => {
    return (
        <Tabs defaultValue="configuration">
            <TabsList className="w-full">
                <TabsTrigger className="w-full" value="configuration">Операции</TabsTrigger>
                <TabsTrigger className="w-full" value="history">История</TabsTrigger>
            </TabsList>
            <TabsContent value="configuration">Make changes to your account here.</TabsContent>
            <TabsContent value="history">История</TabsContent>
        </Tabs>
    )
}