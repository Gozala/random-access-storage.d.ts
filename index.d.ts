
declare module 'random-access-storage' {
  export interface RandomAccessProvider {
    open?: ?((Open) => void)
    openReadonly?: ?((Open) => void)
    close?:?((Close) => void)
    destroy?:?((Destroy) => void)

    read?:?((Read) => void)
    write?:?((Write) => void)
    del?:?((Delete) => void)
    stat?:?((Stat) => void)
  }

  // Non blocking
  type READ = 0
  type WRITE = 1
  type DELETE = 2
  type STAT = 3

  // Blocking
  type OPEN = 4
  type CLOSE = 5
  type DESTROY = 6

  type RequestType = OPEN | CLOSE | DESTROY | READ | WRITE | DELETE | STAT

  interface Open {
    type: OPEN
    callback(error: null | void | Error): void
  }

  interface Close {
    type: CLOSE
    callback(error: null | void | Error): void
  }

  interface Destroy {
    type: DESTROY
    callback(error: null | void | Error): void
  }

  interface Stat {
    type: STAT
    callback(error: null | void | Error, value: { size: number }): void
  }

  interface Read {
    type: READ
    offset: number
    size: number
    callback(error: null | void | Error, Buffer): void
  }

  interface Write {
    type: WRITE
    offset: number
    size: number
    data: Buffer
    callback(error: null | void | Error, Buffer): void
  }
  interface Delete {
    type: DELETE
    offset: number
    size: number
    callback(error: null | void | Error)
  }

  export type Request = Open | Close | Destroy | Delete | Read | Write

  export interface RandomAccess {
    readable: boolean
    writable: boolean
    deletable: boolean
    statable: boolean
    opened: boolean
    closed: boolean
    destroyed: boolean

    open(callback: (error: null | void | Error) => any): void
    read(
      offset: number,
      length: number,
      callback: (error: null | void | Error, buffer: Buffer) => any
    ): void
    write(offset: number, buffer: Buffer, callback: (error: null | void | Error) => any): void
    del(offset: number, length: number, callback: (error: null | void | Error) => any): void
    stat(callback: (error: null | void | Error, stat: { size: number }) => any): void
    close(callback: (error: null | void | Error) => any): void
    destroy(callback: (error: null | void | Error) => any): void

    on(type: 'open', listener: () => any): void
    off(type: 'open', listener: () => any): void
    on(type: 'close', listener: () => any): void
    off(type: 'close', listener: () => any): void
    on(type: 'destroy', listener: () => any): void
    off(type: 'destroy', listener: () => any): void
  }
}
