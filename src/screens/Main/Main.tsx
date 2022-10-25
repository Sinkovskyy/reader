import React, {useEffect} from 'react'
import {Reader, ReaderProvider} from '@epubjs-react-native/core'
import {useFileSystem} from '@epubjs-react-native/file-system'

import {SafeAreaView, useWindowDimensions} from 'react-native'
import {Books} from '@app/common/books'

import {useState} from 'react'
import RNFS from 'react-native-fs'

export const Main = () => {
  const {width, height} = useWindowDimensions()

  const [book, setBook] = useState<string>(Books.MobiDickOnline)

  useEffect(() => {
    RNFS.readFileAssets(Books.MobiDick, 'base64').then(res => {
      setBook(res)
    })
  }, [])

  return (
    <SafeAreaView>
      <ReaderProvider>
        <Reader
          src={book}
          width={width}
          height={height}
          fileSystem={useFileSystem}
        />
      </ReaderProvider>
    </SafeAreaView>
  )
}
