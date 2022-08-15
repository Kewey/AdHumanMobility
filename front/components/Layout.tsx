import { GoogleMap } from '@react-google-maps/api'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import Header from './Header'

interface LayoutProps {
  title: string
  description: string
  children: ReactElement
  sidebar?: ReactElement
  mapRef?: GoogleMap | undefined
}

function Layout({
  title,
  description,
  children,
  sidebar,
  mapRef,
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title} | APP</title>
        <meta name="description" content={description} />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header mapRef={mapRef} />

        {sidebar ? (
          <div className="grid lg:grid-cols-[400px_1fr] grid-cols-1 h-full">
            <aside className="h-[calc(100vh-80px)] overflow-y-hidden">
              {sidebar}
            </aside>
            <main className="flex-1">{children}</main>
          </div>
        ) : (
          <main className="flex-1">{children}</main>
        )}
      </div>
    </>
  )
}

export default Layout
