import {
  FullScreenMessage,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components';

interface TabItem {
  label: string;
  value: string;
  content: React.ReactNode;
}

export interface ProfileTabsProps {
  momentContent: React.ReactNode | null;
  bookmarkContent: React.ReactNode | null;
}

export function ProfileTabs({
  momentContent,
  bookmarkContent,
}: ProfileTabsProps) {
  const tabs: TabItem[] = [
    {
      label: '내 기록',
      value: 'logs',
      content: momentContent ? (
        momentContent
      ) : (
        <FullScreenMessage className="h-52" message="아직 기록이 없어요." />
      ),
    },
    {
      label: '북마크',
      value: 'bookmarks',
      content: bookmarkContent ? (
        <div className="mt-6">{bookmarkContent}</div>
      ) : (
        <FullScreenMessage
          className="h-52"
          message="아직 북마크한 장소가 없어요."
        />
      ),
    },
  ];

  return (
    <Tabs defaultValue="logs" className="w-full">
      <TabsList className="w-full">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-3">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
