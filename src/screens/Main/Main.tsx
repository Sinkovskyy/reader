import React, {useEffect} from 'react'
import {Reader, ReaderProvider} from '@epubjs-react-native/core'
import {useFileSystem} from '@epubjs-react-native/file-system'
import {SafeAreaView, useWindowDimensions} from 'react-native'
import {useState} from 'react'
import RNFS from 'react-native-fs'

import {Books} from '@app/common/books'
import {TReaderPosition} from '@app/common/types'
import {Utils} from '@app/common/utils'

const DEFAULT_PAGE = '1'

export const Main = () => {
  const {width, height} = useWindowDimensions()

  const [book, setBook] = useState<string>('')
  const [position, setPosition] = useState<string>(DEFAULT_PAGE)

  const onLocationChange = (targetPosition: TReaderPosition) => {
    const cfi: string = targetPosition.end.cfi

    targetPosition && setPosition(cfi)
    Utils.Reader.setLocation(cfi)
  }

  const getBook = () => {
    RNFS.readFileAssets(Books.MobiDick, 'base64')
      .then(res => {
        setBook(res)
      })
      .catch(() => {
        setBook(Books.MobiDickOnline)
      })
  }

  const getCurrentPosition = async () => {
    const pos = await Utils.Reader.getLocation()
    pos && setPosition(pos)
  }

  useEffect(() => {
    getBook()
    getCurrentPosition()
  }, [])

  return (
    <SafeAreaView>
      <ReaderProvider>
        <Reader
          src={book}
          width={width}
          height={height}
          fileSystem={useFileSystem}
          onLocationChange={(total, currentLocation) =>
            // Library error. In types return number. In real case it is object
            // @ts-ignore
            onLocationChange(currentLocation as TReaderPosition)
          }
          initialLocation={position}
        />
      </ReaderProvider>
    </SafeAreaView>
  )
}
