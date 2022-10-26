import React, {useEffect} from 'react'
import {Reader as ReaderView, ReaderProvider} from '@epubjs-react-native/core'
import {useFileSystem} from '@epubjs-react-native/file-system'
import {SafeAreaView, useWindowDimensions} from 'react-native'
import {useState} from 'react'
import RNFS from 'react-native-fs'
import {Books} from '@app/common/books'
import {Utils} from '@app/common/utils'

import {TReaderPosition} from './types'

const DEFAULT_PAGE = '1'
const ENCODING = 'base64'

export const Reader = () => {
  const {width, height} = useWindowDimensions()

  const [book, setBook] = useState<string>('')
  const [position, setPosition] = useState<string>(DEFAULT_PAGE)

  const onLocationChange = (targetPosition: TReaderPosition) => {
    const cfi: string = targetPosition.end.cfi

    targetPosition && setPosition(cfi)
    Utils.Reader.setLocation(cfi)
  }

  const fetchBook = () => {
    RNFS.readFileAssets(Books.MobiDick, ENCODING)
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
    fetchBook()
    getCurrentPosition()
  }, [])

  return (
    <SafeAreaView>
      <ReaderProvider>
        <ReaderView
          src={book}
          width={width}
          height={height}
          fileSystem={useFileSystem}
          onLocationChange={(total, currentLocation) =>
            // Library error. In types return number. In real case it is object
            // @ts-ignore
            onLocationChange(currentLocation)
          }
          initialLocation={position}
        />
      </ReaderProvider>
    </SafeAreaView>
  )
}
