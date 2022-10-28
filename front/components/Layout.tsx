import Head from 'next/head'
import React, { ReactElement } from 'react'
import { Toaster } from 'react-hot-toast'

import Header from './Header'

interface LayoutProps {
  title: string
  description?: string
  marginHorizontal?: boolean
  children: ReactElement
  sidebar?: ReactElement
  searchBar?: ReactElement
}

const Layout = ({
  title,
  description,
  children,
  sidebar,
  searchBar,
  marginHorizontal = true,
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title} | ADMobility</title>
        {!!description && <meta name="description" content={description} />}
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header searchBar={searchBar} />
        <div className={`flex-1 ${marginHorizontal ? 'my-8' : ''}`}>
          {sidebar ? (
            <div className="grid lg:grid-cols-[400px_1fr] grid-cols-1 h-full">
              <aside className="h-[calc(100vh-80px)] overflow-y-hidden">
                {sidebar}
              </aside>
              <main className="flex-1 px-6 relative">{children}</main>
            </div>
          ) : (
            <main className="flex-1 px-6 relative">{children}</main>
          )}
        </div>
        <Toaster position="bottom-center" />
      </div>
    </>
  )
}

export default Layout
