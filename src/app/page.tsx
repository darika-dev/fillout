'use client'

import { Tabs, TabsContent } from '@radix-ui/react-tabs'
import { useState } from 'react'

import { PageNavBar } from '@/app/components/PageNavBar'
import { initialPages } from '@/app/components/PageNavBar/constants'
import type { PageItem } from '@/app/components/PageNavBar/types'
import { Panel } from '@/app/components/ui/Panel'

export default function Home() {
  const [pages, setPages] = useState<PageItem[]>(initialPages)
  const [activePage, setActivePage] = useState<string>(initialPages[0].id)

  const onTabChange = (value: string) => {
    setActivePage(value)
  }

  return (
    <div className="px-4 py-4 h-full">
      <Tabs className="h-full flex flex-col gap-4" value={activePage} onValueChange={onTabChange}>
        <Panel className="flex justify-center items-center h-full text-center">
          {pages.map((page) => (
            <TabsContent key={page.id} value={page.id} className="text-muted">
              {page.label} content
            </TabsContent>
          ))}
        </Panel>

        <Panel className="owerflow-auto">
          <PageNavBar pages={pages} setPages={setPages} activePage={activePage} onTabChange={onTabChange} />
        </Panel>
      </Tabs>
    </div>
  )
}
