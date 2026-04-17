
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Playlist
 * 
 */
export type Playlist = $Result.DefaultSelection<Prisma.$PlaylistPayload>
/**
 * Model PlaylistCancion
 * 
 */
export type PlaylistCancion = $Result.DefaultSelection<Prisma.$PlaylistCancionPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Playlists
 * const playlists = await prisma.playlist.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Playlists
   * const playlists = await prisma.playlist.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.playlist`: Exposes CRUD operations for the **Playlist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Playlists
    * const playlists = await prisma.playlist.findMany()
    * ```
    */
  get playlist(): Prisma.PlaylistDelegate<ExtArgs>;

  /**
   * `prisma.playlistCancion`: Exposes CRUD operations for the **PlaylistCancion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlaylistCancions
    * const playlistCancions = await prisma.playlistCancion.findMany()
    * ```
    */
  get playlistCancion(): Prisma.PlaylistCancionDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Playlist: 'Playlist',
    PlaylistCancion: 'PlaylistCancion'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "playlist" | "playlistCancion"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Playlist: {
        payload: Prisma.$PlaylistPayload<ExtArgs>
        fields: Prisma.PlaylistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlaylistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlaylistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          findFirst: {
            args: Prisma.PlaylistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlaylistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          findMany: {
            args: Prisma.PlaylistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>[]
          }
          create: {
            args: Prisma.PlaylistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          createMany: {
            args: Prisma.PlaylistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlaylistCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>[]
          }
          delete: {
            args: Prisma.PlaylistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          update: {
            args: Prisma.PlaylistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          deleteMany: {
            args: Prisma.PlaylistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlaylistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlaylistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          aggregate: {
            args: Prisma.PlaylistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlaylist>
          }
          groupBy: {
            args: Prisma.PlaylistGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlaylistGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlaylistCountArgs<ExtArgs>
            result: $Utils.Optional<PlaylistCountAggregateOutputType> | number
          }
        }
      }
      PlaylistCancion: {
        payload: Prisma.$PlaylistCancionPayload<ExtArgs>
        fields: Prisma.PlaylistCancionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlaylistCancionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistCancionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlaylistCancionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistCancionPayload>
          }
          findFirst: {
            args: Prisma.PlaylistCancionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistCancionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlaylistCancionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistCancionPayload>
          }
          findMany: {
            args: Prisma.PlaylistCancionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistCancionPayload>[]
          }
          create: {
            args: Prisma.PlaylistCancionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistCancionPayload>
          }
          createMany: {
            args: Prisma.PlaylistCancionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlaylistCancionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistCancionPayload>[]
          }
          delete: {
            args: Prisma.PlaylistCancionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistCancionPayload>
          }
          update: {
            args: Prisma.PlaylistCancionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistCancionPayload>
          }
          deleteMany: {
            args: Prisma.PlaylistCancionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlaylistCancionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlaylistCancionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistCancionPayload>
          }
          aggregate: {
            args: Prisma.PlaylistCancionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlaylistCancion>
          }
          groupBy: {
            args: Prisma.PlaylistCancionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlaylistCancionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlaylistCancionCountArgs<ExtArgs>
            result: $Utils.Optional<PlaylistCancionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PlaylistCountOutputType
   */

  export type PlaylistCountOutputType = {
    canciones: number
  }

  export type PlaylistCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    canciones?: boolean | PlaylistCountOutputTypeCountCancionesArgs
  }

  // Custom InputTypes
  /**
   * PlaylistCountOutputType without action
   */
  export type PlaylistCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistCountOutputType
     */
    select?: PlaylistCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlaylistCountOutputType without action
   */
  export type PlaylistCountOutputTypeCountCancionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaylistCancionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Playlist
   */

  export type AggregatePlaylist = {
    _count: PlaylistCountAggregateOutputType | null
    _avg: PlaylistAvgAggregateOutputType | null
    _sum: PlaylistSumAggregateOutputType | null
    _min: PlaylistMinAggregateOutputType | null
    _max: PlaylistMaxAggregateOutputType | null
  }

  export type PlaylistAvgAggregateOutputType = {
    id: number | null
    orden: number | null
  }

  export type PlaylistSumAggregateOutputType = {
    id: number | null
    orden: number | null
  }

  export type PlaylistMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    descripcion: string | null
    imagenUrl: string | null
    esFavoritos: boolean | null
    orden: number | null
    createdAt: Date | null
  }

  export type PlaylistMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    descripcion: string | null
    imagenUrl: string | null
    esFavoritos: boolean | null
    orden: number | null
    createdAt: Date | null
  }

  export type PlaylistCountAggregateOutputType = {
    id: number
    nombre: number
    descripcion: number
    imagenUrl: number
    esFavoritos: number
    orden: number
    createdAt: number
    _all: number
  }


  export type PlaylistAvgAggregateInputType = {
    id?: true
    orden?: true
  }

  export type PlaylistSumAggregateInputType = {
    id?: true
    orden?: true
  }

  export type PlaylistMinAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    imagenUrl?: true
    esFavoritos?: true
    orden?: true
    createdAt?: true
  }

  export type PlaylistMaxAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    imagenUrl?: true
    esFavoritos?: true
    orden?: true
    createdAt?: true
  }

  export type PlaylistCountAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    imagenUrl?: true
    esFavoritos?: true
    orden?: true
    createdAt?: true
    _all?: true
  }

  export type PlaylistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Playlist to aggregate.
     */
    where?: PlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Playlists to fetch.
     */
    orderBy?: PlaylistOrderByWithRelationInput | PlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Playlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Playlists
    **/
    _count?: true | PlaylistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlaylistAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlaylistSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlaylistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlaylistMaxAggregateInputType
  }

  export type GetPlaylistAggregateType<T extends PlaylistAggregateArgs> = {
        [P in keyof T & keyof AggregatePlaylist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlaylist[P]>
      : GetScalarType<T[P], AggregatePlaylist[P]>
  }




  export type PlaylistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaylistWhereInput
    orderBy?: PlaylistOrderByWithAggregationInput | PlaylistOrderByWithAggregationInput[]
    by: PlaylistScalarFieldEnum[] | PlaylistScalarFieldEnum
    having?: PlaylistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlaylistCountAggregateInputType | true
    _avg?: PlaylistAvgAggregateInputType
    _sum?: PlaylistSumAggregateInputType
    _min?: PlaylistMinAggregateInputType
    _max?: PlaylistMaxAggregateInputType
  }

  export type PlaylistGroupByOutputType = {
    id: number
    nombre: string
    descripcion: string
    imagenUrl: string
    esFavoritos: boolean
    orden: number
    createdAt: Date
    _count: PlaylistCountAggregateOutputType | null
    _avg: PlaylistAvgAggregateOutputType | null
    _sum: PlaylistSumAggregateOutputType | null
    _min: PlaylistMinAggregateOutputType | null
    _max: PlaylistMaxAggregateOutputType | null
  }

  type GetPlaylistGroupByPayload<T extends PlaylistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlaylistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlaylistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlaylistGroupByOutputType[P]>
            : GetScalarType<T[P], PlaylistGroupByOutputType[P]>
        }
      >
    >


  export type PlaylistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    imagenUrl?: boolean
    esFavoritos?: boolean
    orden?: boolean
    createdAt?: boolean
    canciones?: boolean | Playlist$cancionesArgs<ExtArgs>
    _count?: boolean | PlaylistCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playlist"]>

  export type PlaylistSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    imagenUrl?: boolean
    esFavoritos?: boolean
    orden?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["playlist"]>

  export type PlaylistSelectScalar = {
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    imagenUrl?: boolean
    esFavoritos?: boolean
    orden?: boolean
    createdAt?: boolean
  }

  export type PlaylistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    canciones?: boolean | Playlist$cancionesArgs<ExtArgs>
    _count?: boolean | PlaylistCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlaylistIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PlaylistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Playlist"
    objects: {
      canciones: Prisma.$PlaylistCancionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      descripcion: string
      imagenUrl: string
      esFavoritos: boolean
      orden: number
      createdAt: Date
    }, ExtArgs["result"]["playlist"]>
    composites: {}
  }

  type PlaylistGetPayload<S extends boolean | null | undefined | PlaylistDefaultArgs> = $Result.GetResult<Prisma.$PlaylistPayload, S>

  type PlaylistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PlaylistFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PlaylistCountAggregateInputType | true
    }

  export interface PlaylistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Playlist'], meta: { name: 'Playlist' } }
    /**
     * Find zero or one Playlist that matches the filter.
     * @param {PlaylistFindUniqueArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlaylistFindUniqueArgs>(args: SelectSubset<T, PlaylistFindUniqueArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Playlist that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PlaylistFindUniqueOrThrowArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlaylistFindUniqueOrThrowArgs>(args: SelectSubset<T, PlaylistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Playlist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistFindFirstArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlaylistFindFirstArgs>(args?: SelectSubset<T, PlaylistFindFirstArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Playlist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistFindFirstOrThrowArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlaylistFindFirstOrThrowArgs>(args?: SelectSubset<T, PlaylistFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Playlists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Playlists
     * const playlists = await prisma.playlist.findMany()
     * 
     * // Get first 10 Playlists
     * const playlists = await prisma.playlist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playlistWithIdOnly = await prisma.playlist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlaylistFindManyArgs>(args?: SelectSubset<T, PlaylistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Playlist.
     * @param {PlaylistCreateArgs} args - Arguments to create a Playlist.
     * @example
     * // Create one Playlist
     * const Playlist = await prisma.playlist.create({
     *   data: {
     *     // ... data to create a Playlist
     *   }
     * })
     * 
     */
    create<T extends PlaylistCreateArgs>(args: SelectSubset<T, PlaylistCreateArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Playlists.
     * @param {PlaylistCreateManyArgs} args - Arguments to create many Playlists.
     * @example
     * // Create many Playlists
     * const playlist = await prisma.playlist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlaylistCreateManyArgs>(args?: SelectSubset<T, PlaylistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Playlists and returns the data saved in the database.
     * @param {PlaylistCreateManyAndReturnArgs} args - Arguments to create many Playlists.
     * @example
     * // Create many Playlists
     * const playlist = await prisma.playlist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Playlists and only return the `id`
     * const playlistWithIdOnly = await prisma.playlist.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlaylistCreateManyAndReturnArgs>(args?: SelectSubset<T, PlaylistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Playlist.
     * @param {PlaylistDeleteArgs} args - Arguments to delete one Playlist.
     * @example
     * // Delete one Playlist
     * const Playlist = await prisma.playlist.delete({
     *   where: {
     *     // ... filter to delete one Playlist
     *   }
     * })
     * 
     */
    delete<T extends PlaylistDeleteArgs>(args: SelectSubset<T, PlaylistDeleteArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Playlist.
     * @param {PlaylistUpdateArgs} args - Arguments to update one Playlist.
     * @example
     * // Update one Playlist
     * const playlist = await prisma.playlist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlaylistUpdateArgs>(args: SelectSubset<T, PlaylistUpdateArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Playlists.
     * @param {PlaylistDeleteManyArgs} args - Arguments to filter Playlists to delete.
     * @example
     * // Delete a few Playlists
     * const { count } = await prisma.playlist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlaylistDeleteManyArgs>(args?: SelectSubset<T, PlaylistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Playlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Playlists
     * const playlist = await prisma.playlist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlaylistUpdateManyArgs>(args: SelectSubset<T, PlaylistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Playlist.
     * @param {PlaylistUpsertArgs} args - Arguments to update or create a Playlist.
     * @example
     * // Update or create a Playlist
     * const playlist = await prisma.playlist.upsert({
     *   create: {
     *     // ... data to create a Playlist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Playlist we want to update
     *   }
     * })
     */
    upsert<T extends PlaylistUpsertArgs>(args: SelectSubset<T, PlaylistUpsertArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Playlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistCountArgs} args - Arguments to filter Playlists to count.
     * @example
     * // Count the number of Playlists
     * const count = await prisma.playlist.count({
     *   where: {
     *     // ... the filter for the Playlists we want to count
     *   }
     * })
    **/
    count<T extends PlaylistCountArgs>(
      args?: Subset<T, PlaylistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlaylistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Playlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlaylistAggregateArgs>(args: Subset<T, PlaylistAggregateArgs>): Prisma.PrismaPromise<GetPlaylistAggregateType<T>>

    /**
     * Group by Playlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlaylistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlaylistGroupByArgs['orderBy'] }
        : { orderBy?: PlaylistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlaylistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlaylistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Playlist model
   */
  readonly fields: PlaylistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Playlist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlaylistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    canciones<T extends Playlist$cancionesArgs<ExtArgs> = {}>(args?: Subset<T, Playlist$cancionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaylistCancionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Playlist model
   */ 
  interface PlaylistFieldRefs {
    readonly id: FieldRef<"Playlist", 'Int'>
    readonly nombre: FieldRef<"Playlist", 'String'>
    readonly descripcion: FieldRef<"Playlist", 'String'>
    readonly imagenUrl: FieldRef<"Playlist", 'String'>
    readonly esFavoritos: FieldRef<"Playlist", 'Boolean'>
    readonly orden: FieldRef<"Playlist", 'Int'>
    readonly createdAt: FieldRef<"Playlist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Playlist findUnique
   */
  export type PlaylistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter, which Playlist to fetch.
     */
    where: PlaylistWhereUniqueInput
  }

  /**
   * Playlist findUniqueOrThrow
   */
  export type PlaylistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter, which Playlist to fetch.
     */
    where: PlaylistWhereUniqueInput
  }

  /**
   * Playlist findFirst
   */
  export type PlaylistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter, which Playlist to fetch.
     */
    where?: PlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Playlists to fetch.
     */
    orderBy?: PlaylistOrderByWithRelationInput | PlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Playlists.
     */
    cursor?: PlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Playlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Playlists.
     */
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
  }

  /**
   * Playlist findFirstOrThrow
   */
  export type PlaylistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter, which Playlist to fetch.
     */
    where?: PlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Playlists to fetch.
     */
    orderBy?: PlaylistOrderByWithRelationInput | PlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Playlists.
     */
    cursor?: PlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Playlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Playlists.
     */
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
  }

  /**
   * Playlist findMany
   */
  export type PlaylistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter, which Playlists to fetch.
     */
    where?: PlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Playlists to fetch.
     */
    orderBy?: PlaylistOrderByWithRelationInput | PlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Playlists.
     */
    cursor?: PlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Playlists.
     */
    skip?: number
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
  }

  /**
   * Playlist create
   */
  export type PlaylistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * The data needed to create a Playlist.
     */
    data: XOR<PlaylistCreateInput, PlaylistUncheckedCreateInput>
  }

  /**
   * Playlist createMany
   */
  export type PlaylistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Playlists.
     */
    data: PlaylistCreateManyInput | PlaylistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Playlist createManyAndReturn
   */
  export type PlaylistCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Playlists.
     */
    data: PlaylistCreateManyInput | PlaylistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Playlist update
   */
  export type PlaylistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * The data needed to update a Playlist.
     */
    data: XOR<PlaylistUpdateInput, PlaylistUncheckedUpdateInput>
    /**
     * Choose, which Playlist to update.
     */
    where: PlaylistWhereUniqueInput
  }

  /**
   * Playlist updateMany
   */
  export type PlaylistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Playlists.
     */
    data: XOR<PlaylistUpdateManyMutationInput, PlaylistUncheckedUpdateManyInput>
    /**
     * Filter which Playlists to update
     */
    where?: PlaylistWhereInput
  }

  /**
   * Playlist upsert
   */
  export type PlaylistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * The filter to search for the Playlist to update in case it exists.
     */
    where: PlaylistWhereUniqueInput
    /**
     * In case the Playlist found by the `where` argument doesn't exist, create a new Playlist with this data.
     */
    create: XOR<PlaylistCreateInput, PlaylistUncheckedCreateInput>
    /**
     * In case the Playlist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlaylistUpdateInput, PlaylistUncheckedUpdateInput>
  }

  /**
   * Playlist delete
   */
  export type PlaylistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter which Playlist to delete.
     */
    where: PlaylistWhereUniqueInput
  }

  /**
   * Playlist deleteMany
   */
  export type PlaylistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Playlists to delete
     */
    where?: PlaylistWhereInput
  }

  /**
   * Playlist.canciones
   */
  export type Playlist$cancionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistCancion
     */
    select?: PlaylistCancionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistCancionInclude<ExtArgs> | null
    where?: PlaylistCancionWhereInput
    orderBy?: PlaylistCancionOrderByWithRelationInput | PlaylistCancionOrderByWithRelationInput[]
    cursor?: PlaylistCancionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlaylistCancionScalarFieldEnum | PlaylistCancionScalarFieldEnum[]
  }

  /**
   * Playlist without action
   */
  export type PlaylistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
  }


  /**
   * Model PlaylistCancion
   */

  export type AggregatePlaylistCancion = {
    _count: PlaylistCancionCountAggregateOutputType | null
    _avg: PlaylistCancionAvgAggregateOutputType | null
    _sum: PlaylistCancionSumAggregateOutputType | null
    _min: PlaylistCancionMinAggregateOutputType | null
    _max: PlaylistCancionMaxAggregateOutputType | null
  }

  export type PlaylistCancionAvgAggregateOutputType = {
    id: number | null
    playlistId: number | null
    duracion: number | null
    orden: number | null
  }

  export type PlaylistCancionSumAggregateOutputType = {
    id: number | null
    playlistId: number | null
    duracion: number | null
    orden: number | null
  }

  export type PlaylistCancionMinAggregateOutputType = {
    id: number | null
    playlistId: number | null
    titulo: string | null
    artista: string | null
    duracion: number | null
    spotifyUri: string | null
    imagenUrl: string | null
    orden: number | null
  }

  export type PlaylistCancionMaxAggregateOutputType = {
    id: number | null
    playlistId: number | null
    titulo: string | null
    artista: string | null
    duracion: number | null
    spotifyUri: string | null
    imagenUrl: string | null
    orden: number | null
  }

  export type PlaylistCancionCountAggregateOutputType = {
    id: number
    playlistId: number
    titulo: number
    artista: number
    duracion: number
    spotifyUri: number
    imagenUrl: number
    orden: number
    _all: number
  }


  export type PlaylistCancionAvgAggregateInputType = {
    id?: true
    playlistId?: true
    duracion?: true
    orden?: true
  }

  export type PlaylistCancionSumAggregateInputType = {
    id?: true
    playlistId?: true
    duracion?: true
    orden?: true
  }

  export type PlaylistCancionMinAggregateInputType = {
    id?: true
    playlistId?: true
    titulo?: true
    artista?: true
    duracion?: true
    spotifyUri?: true
    imagenUrl?: true
    orden?: true
  }

  export type PlaylistCancionMaxAggregateInputType = {
    id?: true
    playlistId?: true
    titulo?: true
    artista?: true
    duracion?: true
    spotifyUri?: true
    imagenUrl?: true
    orden?: true
  }

  export type PlaylistCancionCountAggregateInputType = {
    id?: true
    playlistId?: true
    titulo?: true
    artista?: true
    duracion?: true
    spotifyUri?: true
    imagenUrl?: true
    orden?: true
    _all?: true
  }

  export type PlaylistCancionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlaylistCancion to aggregate.
     */
    where?: PlaylistCancionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaylistCancions to fetch.
     */
    orderBy?: PlaylistCancionOrderByWithRelationInput | PlaylistCancionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlaylistCancionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaylistCancions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaylistCancions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlaylistCancions
    **/
    _count?: true | PlaylistCancionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlaylistCancionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlaylistCancionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlaylistCancionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlaylistCancionMaxAggregateInputType
  }

  export type GetPlaylistCancionAggregateType<T extends PlaylistCancionAggregateArgs> = {
        [P in keyof T & keyof AggregatePlaylistCancion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlaylistCancion[P]>
      : GetScalarType<T[P], AggregatePlaylistCancion[P]>
  }




  export type PlaylistCancionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaylistCancionWhereInput
    orderBy?: PlaylistCancionOrderByWithAggregationInput | PlaylistCancionOrderByWithAggregationInput[]
    by: PlaylistCancionScalarFieldEnum[] | PlaylistCancionScalarFieldEnum
    having?: PlaylistCancionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlaylistCancionCountAggregateInputType | true
    _avg?: PlaylistCancionAvgAggregateInputType
    _sum?: PlaylistCancionSumAggregateInputType
    _min?: PlaylistCancionMinAggregateInputType
    _max?: PlaylistCancionMaxAggregateInputType
  }

  export type PlaylistCancionGroupByOutputType = {
    id: number
    playlistId: number
    titulo: string
    artista: string
    duracion: number
    spotifyUri: string
    imagenUrl: string
    orden: number
    _count: PlaylistCancionCountAggregateOutputType | null
    _avg: PlaylistCancionAvgAggregateOutputType | null
    _sum: PlaylistCancionSumAggregateOutputType | null
    _min: PlaylistCancionMinAggregateOutputType | null
    _max: PlaylistCancionMaxAggregateOutputType | null
  }

  type GetPlaylistCancionGroupByPayload<T extends PlaylistCancionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlaylistCancionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlaylistCancionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlaylistCancionGroupByOutputType[P]>
            : GetScalarType<T[P], PlaylistCancionGroupByOutputType[P]>
        }
      >
    >


  export type PlaylistCancionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playlistId?: boolean
    titulo?: boolean
    artista?: boolean
    duracion?: boolean
    spotifyUri?: boolean
    imagenUrl?: boolean
    orden?: boolean
    playlist?: boolean | PlaylistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playlistCancion"]>

  export type PlaylistCancionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playlistId?: boolean
    titulo?: boolean
    artista?: boolean
    duracion?: boolean
    spotifyUri?: boolean
    imagenUrl?: boolean
    orden?: boolean
    playlist?: boolean | PlaylistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playlistCancion"]>

  export type PlaylistCancionSelectScalar = {
    id?: boolean
    playlistId?: boolean
    titulo?: boolean
    artista?: boolean
    duracion?: boolean
    spotifyUri?: boolean
    imagenUrl?: boolean
    orden?: boolean
  }

  export type PlaylistCancionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playlist?: boolean | PlaylistDefaultArgs<ExtArgs>
  }
  export type PlaylistCancionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playlist?: boolean | PlaylistDefaultArgs<ExtArgs>
  }

  export type $PlaylistCancionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlaylistCancion"
    objects: {
      playlist: Prisma.$PlaylistPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      playlistId: number
      titulo: string
      artista: string
      duracion: number
      spotifyUri: string
      imagenUrl: string
      orden: number
    }, ExtArgs["result"]["playlistCancion"]>
    composites: {}
  }

  type PlaylistCancionGetPayload<S extends boolean | null | undefined | PlaylistCancionDefaultArgs> = $Result.GetResult<Prisma.$PlaylistCancionPayload, S>

  type PlaylistCancionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PlaylistCancionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PlaylistCancionCountAggregateInputType | true
    }

  export interface PlaylistCancionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlaylistCancion'], meta: { name: 'PlaylistCancion' } }
    /**
     * Find zero or one PlaylistCancion that matches the filter.
     * @param {PlaylistCancionFindUniqueArgs} args - Arguments to find a PlaylistCancion
     * @example
     * // Get one PlaylistCancion
     * const playlistCancion = await prisma.playlistCancion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlaylistCancionFindUniqueArgs>(args: SelectSubset<T, PlaylistCancionFindUniqueArgs<ExtArgs>>): Prisma__PlaylistCancionClient<$Result.GetResult<Prisma.$PlaylistCancionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PlaylistCancion that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PlaylistCancionFindUniqueOrThrowArgs} args - Arguments to find a PlaylistCancion
     * @example
     * // Get one PlaylistCancion
     * const playlistCancion = await prisma.playlistCancion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlaylistCancionFindUniqueOrThrowArgs>(args: SelectSubset<T, PlaylistCancionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlaylistCancionClient<$Result.GetResult<Prisma.$PlaylistCancionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PlaylistCancion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistCancionFindFirstArgs} args - Arguments to find a PlaylistCancion
     * @example
     * // Get one PlaylistCancion
     * const playlistCancion = await prisma.playlistCancion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlaylistCancionFindFirstArgs>(args?: SelectSubset<T, PlaylistCancionFindFirstArgs<ExtArgs>>): Prisma__PlaylistCancionClient<$Result.GetResult<Prisma.$PlaylistCancionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PlaylistCancion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistCancionFindFirstOrThrowArgs} args - Arguments to find a PlaylistCancion
     * @example
     * // Get one PlaylistCancion
     * const playlistCancion = await prisma.playlistCancion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlaylistCancionFindFirstOrThrowArgs>(args?: SelectSubset<T, PlaylistCancionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlaylistCancionClient<$Result.GetResult<Prisma.$PlaylistCancionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PlaylistCancions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistCancionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlaylistCancions
     * const playlistCancions = await prisma.playlistCancion.findMany()
     * 
     * // Get first 10 PlaylistCancions
     * const playlistCancions = await prisma.playlistCancion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playlistCancionWithIdOnly = await prisma.playlistCancion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlaylistCancionFindManyArgs>(args?: SelectSubset<T, PlaylistCancionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaylistCancionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PlaylistCancion.
     * @param {PlaylistCancionCreateArgs} args - Arguments to create a PlaylistCancion.
     * @example
     * // Create one PlaylistCancion
     * const PlaylistCancion = await prisma.playlistCancion.create({
     *   data: {
     *     // ... data to create a PlaylistCancion
     *   }
     * })
     * 
     */
    create<T extends PlaylistCancionCreateArgs>(args: SelectSubset<T, PlaylistCancionCreateArgs<ExtArgs>>): Prisma__PlaylistCancionClient<$Result.GetResult<Prisma.$PlaylistCancionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PlaylistCancions.
     * @param {PlaylistCancionCreateManyArgs} args - Arguments to create many PlaylistCancions.
     * @example
     * // Create many PlaylistCancions
     * const playlistCancion = await prisma.playlistCancion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlaylistCancionCreateManyArgs>(args?: SelectSubset<T, PlaylistCancionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlaylistCancions and returns the data saved in the database.
     * @param {PlaylistCancionCreateManyAndReturnArgs} args - Arguments to create many PlaylistCancions.
     * @example
     * // Create many PlaylistCancions
     * const playlistCancion = await prisma.playlistCancion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlaylistCancions and only return the `id`
     * const playlistCancionWithIdOnly = await prisma.playlistCancion.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlaylistCancionCreateManyAndReturnArgs>(args?: SelectSubset<T, PlaylistCancionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaylistCancionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PlaylistCancion.
     * @param {PlaylistCancionDeleteArgs} args - Arguments to delete one PlaylistCancion.
     * @example
     * // Delete one PlaylistCancion
     * const PlaylistCancion = await prisma.playlistCancion.delete({
     *   where: {
     *     // ... filter to delete one PlaylistCancion
     *   }
     * })
     * 
     */
    delete<T extends PlaylistCancionDeleteArgs>(args: SelectSubset<T, PlaylistCancionDeleteArgs<ExtArgs>>): Prisma__PlaylistCancionClient<$Result.GetResult<Prisma.$PlaylistCancionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PlaylistCancion.
     * @param {PlaylistCancionUpdateArgs} args - Arguments to update one PlaylistCancion.
     * @example
     * // Update one PlaylistCancion
     * const playlistCancion = await prisma.playlistCancion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlaylistCancionUpdateArgs>(args: SelectSubset<T, PlaylistCancionUpdateArgs<ExtArgs>>): Prisma__PlaylistCancionClient<$Result.GetResult<Prisma.$PlaylistCancionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PlaylistCancions.
     * @param {PlaylistCancionDeleteManyArgs} args - Arguments to filter PlaylistCancions to delete.
     * @example
     * // Delete a few PlaylistCancions
     * const { count } = await prisma.playlistCancion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlaylistCancionDeleteManyArgs>(args?: SelectSubset<T, PlaylistCancionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlaylistCancions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistCancionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlaylistCancions
     * const playlistCancion = await prisma.playlistCancion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlaylistCancionUpdateManyArgs>(args: SelectSubset<T, PlaylistCancionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PlaylistCancion.
     * @param {PlaylistCancionUpsertArgs} args - Arguments to update or create a PlaylistCancion.
     * @example
     * // Update or create a PlaylistCancion
     * const playlistCancion = await prisma.playlistCancion.upsert({
     *   create: {
     *     // ... data to create a PlaylistCancion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlaylistCancion we want to update
     *   }
     * })
     */
    upsert<T extends PlaylistCancionUpsertArgs>(args: SelectSubset<T, PlaylistCancionUpsertArgs<ExtArgs>>): Prisma__PlaylistCancionClient<$Result.GetResult<Prisma.$PlaylistCancionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PlaylistCancions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistCancionCountArgs} args - Arguments to filter PlaylistCancions to count.
     * @example
     * // Count the number of PlaylistCancions
     * const count = await prisma.playlistCancion.count({
     *   where: {
     *     // ... the filter for the PlaylistCancions we want to count
     *   }
     * })
    **/
    count<T extends PlaylistCancionCountArgs>(
      args?: Subset<T, PlaylistCancionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlaylistCancionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlaylistCancion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistCancionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlaylistCancionAggregateArgs>(args: Subset<T, PlaylistCancionAggregateArgs>): Prisma.PrismaPromise<GetPlaylistCancionAggregateType<T>>

    /**
     * Group by PlaylistCancion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistCancionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlaylistCancionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlaylistCancionGroupByArgs['orderBy'] }
        : { orderBy?: PlaylistCancionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlaylistCancionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlaylistCancionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlaylistCancion model
   */
  readonly fields: PlaylistCancionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlaylistCancion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlaylistCancionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    playlist<T extends PlaylistDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlaylistDefaultArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlaylistCancion model
   */ 
  interface PlaylistCancionFieldRefs {
    readonly id: FieldRef<"PlaylistCancion", 'Int'>
    readonly playlistId: FieldRef<"PlaylistCancion", 'Int'>
    readonly titulo: FieldRef<"PlaylistCancion", 'String'>
    readonly artista: FieldRef<"PlaylistCancion", 'String'>
    readonly duracion: FieldRef<"PlaylistCancion", 'Int'>
    readonly spotifyUri: FieldRef<"PlaylistCancion", 'String'>
    readonly imagenUrl: FieldRef<"PlaylistCancion", 'String'>
    readonly orden: FieldRef<"PlaylistCancion", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PlaylistCancion findUnique
   */
  export type PlaylistCancionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistCancion
     */
    select?: PlaylistCancionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistCancionInclude<ExtArgs> | null
    /**
     * Filter, which PlaylistCancion to fetch.
     */
    where: PlaylistCancionWhereUniqueInput
  }

  /**
   * PlaylistCancion findUniqueOrThrow
   */
  export type PlaylistCancionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistCancion
     */
    select?: PlaylistCancionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistCancionInclude<ExtArgs> | null
    /**
     * Filter, which PlaylistCancion to fetch.
     */
    where: PlaylistCancionWhereUniqueInput
  }

  /**
   * PlaylistCancion findFirst
   */
  export type PlaylistCancionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistCancion
     */
    select?: PlaylistCancionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistCancionInclude<ExtArgs> | null
    /**
     * Filter, which PlaylistCancion to fetch.
     */
    where?: PlaylistCancionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaylistCancions to fetch.
     */
    orderBy?: PlaylistCancionOrderByWithRelationInput | PlaylistCancionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlaylistCancions.
     */
    cursor?: PlaylistCancionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaylistCancions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaylistCancions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlaylistCancions.
     */
    distinct?: PlaylistCancionScalarFieldEnum | PlaylistCancionScalarFieldEnum[]
  }

  /**
   * PlaylistCancion findFirstOrThrow
   */
  export type PlaylistCancionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistCancion
     */
    select?: PlaylistCancionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistCancionInclude<ExtArgs> | null
    /**
     * Filter, which PlaylistCancion to fetch.
     */
    where?: PlaylistCancionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaylistCancions to fetch.
     */
    orderBy?: PlaylistCancionOrderByWithRelationInput | PlaylistCancionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlaylistCancions.
     */
    cursor?: PlaylistCancionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaylistCancions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaylistCancions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlaylistCancions.
     */
    distinct?: PlaylistCancionScalarFieldEnum | PlaylistCancionScalarFieldEnum[]
  }

  /**
   * PlaylistCancion findMany
   */
  export type PlaylistCancionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistCancion
     */
    select?: PlaylistCancionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistCancionInclude<ExtArgs> | null
    /**
     * Filter, which PlaylistCancions to fetch.
     */
    where?: PlaylistCancionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaylistCancions to fetch.
     */
    orderBy?: PlaylistCancionOrderByWithRelationInput | PlaylistCancionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlaylistCancions.
     */
    cursor?: PlaylistCancionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaylistCancions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaylistCancions.
     */
    skip?: number
    distinct?: PlaylistCancionScalarFieldEnum | PlaylistCancionScalarFieldEnum[]
  }

  /**
   * PlaylistCancion create
   */
  export type PlaylistCancionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistCancion
     */
    select?: PlaylistCancionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistCancionInclude<ExtArgs> | null
    /**
     * The data needed to create a PlaylistCancion.
     */
    data: XOR<PlaylistCancionCreateInput, PlaylistCancionUncheckedCreateInput>
  }

  /**
   * PlaylistCancion createMany
   */
  export type PlaylistCancionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlaylistCancions.
     */
    data: PlaylistCancionCreateManyInput | PlaylistCancionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlaylistCancion createManyAndReturn
   */
  export type PlaylistCancionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistCancion
     */
    select?: PlaylistCancionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PlaylistCancions.
     */
    data: PlaylistCancionCreateManyInput | PlaylistCancionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistCancionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlaylistCancion update
   */
  export type PlaylistCancionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistCancion
     */
    select?: PlaylistCancionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistCancionInclude<ExtArgs> | null
    /**
     * The data needed to update a PlaylistCancion.
     */
    data: XOR<PlaylistCancionUpdateInput, PlaylistCancionUncheckedUpdateInput>
    /**
     * Choose, which PlaylistCancion to update.
     */
    where: PlaylistCancionWhereUniqueInput
  }

  /**
   * PlaylistCancion updateMany
   */
  export type PlaylistCancionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlaylistCancions.
     */
    data: XOR<PlaylistCancionUpdateManyMutationInput, PlaylistCancionUncheckedUpdateManyInput>
    /**
     * Filter which PlaylistCancions to update
     */
    where?: PlaylistCancionWhereInput
  }

  /**
   * PlaylistCancion upsert
   */
  export type PlaylistCancionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistCancion
     */
    select?: PlaylistCancionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistCancionInclude<ExtArgs> | null
    /**
     * The filter to search for the PlaylistCancion to update in case it exists.
     */
    where: PlaylistCancionWhereUniqueInput
    /**
     * In case the PlaylistCancion found by the `where` argument doesn't exist, create a new PlaylistCancion with this data.
     */
    create: XOR<PlaylistCancionCreateInput, PlaylistCancionUncheckedCreateInput>
    /**
     * In case the PlaylistCancion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlaylistCancionUpdateInput, PlaylistCancionUncheckedUpdateInput>
  }

  /**
   * PlaylistCancion delete
   */
  export type PlaylistCancionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistCancion
     */
    select?: PlaylistCancionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistCancionInclude<ExtArgs> | null
    /**
     * Filter which PlaylistCancion to delete.
     */
    where: PlaylistCancionWhereUniqueInput
  }

  /**
   * PlaylistCancion deleteMany
   */
  export type PlaylistCancionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlaylistCancions to delete
     */
    where?: PlaylistCancionWhereInput
  }

  /**
   * PlaylistCancion without action
   */
  export type PlaylistCancionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistCancion
     */
    select?: PlaylistCancionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistCancionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PlaylistScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    descripcion: 'descripcion',
    imagenUrl: 'imagenUrl',
    esFavoritos: 'esFavoritos',
    orden: 'orden',
    createdAt: 'createdAt'
  };

  export type PlaylistScalarFieldEnum = (typeof PlaylistScalarFieldEnum)[keyof typeof PlaylistScalarFieldEnum]


  export const PlaylistCancionScalarFieldEnum: {
    id: 'id',
    playlistId: 'playlistId',
    titulo: 'titulo',
    artista: 'artista',
    duracion: 'duracion',
    spotifyUri: 'spotifyUri',
    imagenUrl: 'imagenUrl',
    orden: 'orden'
  };

  export type PlaylistCancionScalarFieldEnum = (typeof PlaylistCancionScalarFieldEnum)[keyof typeof PlaylistCancionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PlaylistWhereInput = {
    AND?: PlaylistWhereInput | PlaylistWhereInput[]
    OR?: PlaylistWhereInput[]
    NOT?: PlaylistWhereInput | PlaylistWhereInput[]
    id?: IntFilter<"Playlist"> | number
    nombre?: StringFilter<"Playlist"> | string
    descripcion?: StringFilter<"Playlist"> | string
    imagenUrl?: StringFilter<"Playlist"> | string
    esFavoritos?: BoolFilter<"Playlist"> | boolean
    orden?: IntFilter<"Playlist"> | number
    createdAt?: DateTimeFilter<"Playlist"> | Date | string
    canciones?: PlaylistCancionListRelationFilter
  }

  export type PlaylistOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    imagenUrl?: SortOrder
    esFavoritos?: SortOrder
    orden?: SortOrder
    createdAt?: SortOrder
    canciones?: PlaylistCancionOrderByRelationAggregateInput
  }

  export type PlaylistWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PlaylistWhereInput | PlaylistWhereInput[]
    OR?: PlaylistWhereInput[]
    NOT?: PlaylistWhereInput | PlaylistWhereInput[]
    nombre?: StringFilter<"Playlist"> | string
    descripcion?: StringFilter<"Playlist"> | string
    imagenUrl?: StringFilter<"Playlist"> | string
    esFavoritos?: BoolFilter<"Playlist"> | boolean
    orden?: IntFilter<"Playlist"> | number
    createdAt?: DateTimeFilter<"Playlist"> | Date | string
    canciones?: PlaylistCancionListRelationFilter
  }, "id">

  export type PlaylistOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    imagenUrl?: SortOrder
    esFavoritos?: SortOrder
    orden?: SortOrder
    createdAt?: SortOrder
    _count?: PlaylistCountOrderByAggregateInput
    _avg?: PlaylistAvgOrderByAggregateInput
    _max?: PlaylistMaxOrderByAggregateInput
    _min?: PlaylistMinOrderByAggregateInput
    _sum?: PlaylistSumOrderByAggregateInput
  }

  export type PlaylistScalarWhereWithAggregatesInput = {
    AND?: PlaylistScalarWhereWithAggregatesInput | PlaylistScalarWhereWithAggregatesInput[]
    OR?: PlaylistScalarWhereWithAggregatesInput[]
    NOT?: PlaylistScalarWhereWithAggregatesInput | PlaylistScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Playlist"> | number
    nombre?: StringWithAggregatesFilter<"Playlist"> | string
    descripcion?: StringWithAggregatesFilter<"Playlist"> | string
    imagenUrl?: StringWithAggregatesFilter<"Playlist"> | string
    esFavoritos?: BoolWithAggregatesFilter<"Playlist"> | boolean
    orden?: IntWithAggregatesFilter<"Playlist"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Playlist"> | Date | string
  }

  export type PlaylistCancionWhereInput = {
    AND?: PlaylistCancionWhereInput | PlaylistCancionWhereInput[]
    OR?: PlaylistCancionWhereInput[]
    NOT?: PlaylistCancionWhereInput | PlaylistCancionWhereInput[]
    id?: IntFilter<"PlaylistCancion"> | number
    playlistId?: IntFilter<"PlaylistCancion"> | number
    titulo?: StringFilter<"PlaylistCancion"> | string
    artista?: StringFilter<"PlaylistCancion"> | string
    duracion?: IntFilter<"PlaylistCancion"> | number
    spotifyUri?: StringFilter<"PlaylistCancion"> | string
    imagenUrl?: StringFilter<"PlaylistCancion"> | string
    orden?: IntFilter<"PlaylistCancion"> | number
    playlist?: XOR<PlaylistRelationFilter, PlaylistWhereInput>
  }

  export type PlaylistCancionOrderByWithRelationInput = {
    id?: SortOrder
    playlistId?: SortOrder
    titulo?: SortOrder
    artista?: SortOrder
    duracion?: SortOrder
    spotifyUri?: SortOrder
    imagenUrl?: SortOrder
    orden?: SortOrder
    playlist?: PlaylistOrderByWithRelationInput
  }

  export type PlaylistCancionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PlaylistCancionWhereInput | PlaylistCancionWhereInput[]
    OR?: PlaylistCancionWhereInput[]
    NOT?: PlaylistCancionWhereInput | PlaylistCancionWhereInput[]
    playlistId?: IntFilter<"PlaylistCancion"> | number
    titulo?: StringFilter<"PlaylistCancion"> | string
    artista?: StringFilter<"PlaylistCancion"> | string
    duracion?: IntFilter<"PlaylistCancion"> | number
    spotifyUri?: StringFilter<"PlaylistCancion"> | string
    imagenUrl?: StringFilter<"PlaylistCancion"> | string
    orden?: IntFilter<"PlaylistCancion"> | number
    playlist?: XOR<PlaylistRelationFilter, PlaylistWhereInput>
  }, "id">

  export type PlaylistCancionOrderByWithAggregationInput = {
    id?: SortOrder
    playlistId?: SortOrder
    titulo?: SortOrder
    artista?: SortOrder
    duracion?: SortOrder
    spotifyUri?: SortOrder
    imagenUrl?: SortOrder
    orden?: SortOrder
    _count?: PlaylistCancionCountOrderByAggregateInput
    _avg?: PlaylistCancionAvgOrderByAggregateInput
    _max?: PlaylistCancionMaxOrderByAggregateInput
    _min?: PlaylistCancionMinOrderByAggregateInput
    _sum?: PlaylistCancionSumOrderByAggregateInput
  }

  export type PlaylistCancionScalarWhereWithAggregatesInput = {
    AND?: PlaylistCancionScalarWhereWithAggregatesInput | PlaylistCancionScalarWhereWithAggregatesInput[]
    OR?: PlaylistCancionScalarWhereWithAggregatesInput[]
    NOT?: PlaylistCancionScalarWhereWithAggregatesInput | PlaylistCancionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PlaylistCancion"> | number
    playlistId?: IntWithAggregatesFilter<"PlaylistCancion"> | number
    titulo?: StringWithAggregatesFilter<"PlaylistCancion"> | string
    artista?: StringWithAggregatesFilter<"PlaylistCancion"> | string
    duracion?: IntWithAggregatesFilter<"PlaylistCancion"> | number
    spotifyUri?: StringWithAggregatesFilter<"PlaylistCancion"> | string
    imagenUrl?: StringWithAggregatesFilter<"PlaylistCancion"> | string
    orden?: IntWithAggregatesFilter<"PlaylistCancion"> | number
  }

  export type PlaylistCreateInput = {
    nombre: string
    descripcion?: string
    imagenUrl?: string
    esFavoritos?: boolean
    orden?: number
    createdAt?: Date | string
    canciones?: PlaylistCancionCreateNestedManyWithoutPlaylistInput
  }

  export type PlaylistUncheckedCreateInput = {
    id?: number
    nombre: string
    descripcion?: string
    imagenUrl?: string
    esFavoritos?: boolean
    orden?: number
    createdAt?: Date | string
    canciones?: PlaylistCancionUncheckedCreateNestedManyWithoutPlaylistInput
  }

  export type PlaylistUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    imagenUrl?: StringFieldUpdateOperationsInput | string
    esFavoritos?: BoolFieldUpdateOperationsInput | boolean
    orden?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    canciones?: PlaylistCancionUpdateManyWithoutPlaylistNestedInput
  }

  export type PlaylistUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    imagenUrl?: StringFieldUpdateOperationsInput | string
    esFavoritos?: BoolFieldUpdateOperationsInput | boolean
    orden?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    canciones?: PlaylistCancionUncheckedUpdateManyWithoutPlaylistNestedInput
  }

  export type PlaylistCreateManyInput = {
    id?: number
    nombre: string
    descripcion?: string
    imagenUrl?: string
    esFavoritos?: boolean
    orden?: number
    createdAt?: Date | string
  }

  export type PlaylistUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    imagenUrl?: StringFieldUpdateOperationsInput | string
    esFavoritos?: BoolFieldUpdateOperationsInput | boolean
    orden?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaylistUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    imagenUrl?: StringFieldUpdateOperationsInput | string
    esFavoritos?: BoolFieldUpdateOperationsInput | boolean
    orden?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaylistCancionCreateInput = {
    titulo: string
    artista: string
    duracion: number
    spotifyUri: string
    imagenUrl: string
    orden: number
    playlist: PlaylistCreateNestedOneWithoutCancionesInput
  }

  export type PlaylistCancionUncheckedCreateInput = {
    id?: number
    playlistId: number
    titulo: string
    artista: string
    duracion: number
    spotifyUri: string
    imagenUrl: string
    orden: number
  }

  export type PlaylistCancionUpdateInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    artista?: StringFieldUpdateOperationsInput | string
    duracion?: IntFieldUpdateOperationsInput | number
    spotifyUri?: StringFieldUpdateOperationsInput | string
    imagenUrl?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    playlist?: PlaylistUpdateOneRequiredWithoutCancionesNestedInput
  }

  export type PlaylistCancionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    playlistId?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    artista?: StringFieldUpdateOperationsInput | string
    duracion?: IntFieldUpdateOperationsInput | number
    spotifyUri?: StringFieldUpdateOperationsInput | string
    imagenUrl?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
  }

  export type PlaylistCancionCreateManyInput = {
    id?: number
    playlistId: number
    titulo: string
    artista: string
    duracion: number
    spotifyUri: string
    imagenUrl: string
    orden: number
  }

  export type PlaylistCancionUpdateManyMutationInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    artista?: StringFieldUpdateOperationsInput | string
    duracion?: IntFieldUpdateOperationsInput | number
    spotifyUri?: StringFieldUpdateOperationsInput | string
    imagenUrl?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
  }

  export type PlaylistCancionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    playlistId?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    artista?: StringFieldUpdateOperationsInput | string
    duracion?: IntFieldUpdateOperationsInput | number
    spotifyUri?: StringFieldUpdateOperationsInput | string
    imagenUrl?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PlaylistCancionListRelationFilter = {
    every?: PlaylistCancionWhereInput
    some?: PlaylistCancionWhereInput
    none?: PlaylistCancionWhereInput
  }

  export type PlaylistCancionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlaylistCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    imagenUrl?: SortOrder
    esFavoritos?: SortOrder
    orden?: SortOrder
    createdAt?: SortOrder
  }

  export type PlaylistAvgOrderByAggregateInput = {
    id?: SortOrder
    orden?: SortOrder
  }

  export type PlaylistMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    imagenUrl?: SortOrder
    esFavoritos?: SortOrder
    orden?: SortOrder
    createdAt?: SortOrder
  }

  export type PlaylistMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    imagenUrl?: SortOrder
    esFavoritos?: SortOrder
    orden?: SortOrder
    createdAt?: SortOrder
  }

  export type PlaylistSumOrderByAggregateInput = {
    id?: SortOrder
    orden?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type PlaylistRelationFilter = {
    is?: PlaylistWhereInput
    isNot?: PlaylistWhereInput
  }

  export type PlaylistCancionCountOrderByAggregateInput = {
    id?: SortOrder
    playlistId?: SortOrder
    titulo?: SortOrder
    artista?: SortOrder
    duracion?: SortOrder
    spotifyUri?: SortOrder
    imagenUrl?: SortOrder
    orden?: SortOrder
  }

  export type PlaylistCancionAvgOrderByAggregateInput = {
    id?: SortOrder
    playlistId?: SortOrder
    duracion?: SortOrder
    orden?: SortOrder
  }

  export type PlaylistCancionMaxOrderByAggregateInput = {
    id?: SortOrder
    playlistId?: SortOrder
    titulo?: SortOrder
    artista?: SortOrder
    duracion?: SortOrder
    spotifyUri?: SortOrder
    imagenUrl?: SortOrder
    orden?: SortOrder
  }

  export type PlaylistCancionMinOrderByAggregateInput = {
    id?: SortOrder
    playlistId?: SortOrder
    titulo?: SortOrder
    artista?: SortOrder
    duracion?: SortOrder
    spotifyUri?: SortOrder
    imagenUrl?: SortOrder
    orden?: SortOrder
  }

  export type PlaylistCancionSumOrderByAggregateInput = {
    id?: SortOrder
    playlistId?: SortOrder
    duracion?: SortOrder
    orden?: SortOrder
  }

  export type PlaylistCancionCreateNestedManyWithoutPlaylistInput = {
    create?: XOR<PlaylistCancionCreateWithoutPlaylistInput, PlaylistCancionUncheckedCreateWithoutPlaylistInput> | PlaylistCancionCreateWithoutPlaylistInput[] | PlaylistCancionUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: PlaylistCancionCreateOrConnectWithoutPlaylistInput | PlaylistCancionCreateOrConnectWithoutPlaylistInput[]
    createMany?: PlaylistCancionCreateManyPlaylistInputEnvelope
    connect?: PlaylistCancionWhereUniqueInput | PlaylistCancionWhereUniqueInput[]
  }

  export type PlaylistCancionUncheckedCreateNestedManyWithoutPlaylistInput = {
    create?: XOR<PlaylistCancionCreateWithoutPlaylistInput, PlaylistCancionUncheckedCreateWithoutPlaylistInput> | PlaylistCancionCreateWithoutPlaylistInput[] | PlaylistCancionUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: PlaylistCancionCreateOrConnectWithoutPlaylistInput | PlaylistCancionCreateOrConnectWithoutPlaylistInput[]
    createMany?: PlaylistCancionCreateManyPlaylistInputEnvelope
    connect?: PlaylistCancionWhereUniqueInput | PlaylistCancionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PlaylistCancionUpdateManyWithoutPlaylistNestedInput = {
    create?: XOR<PlaylistCancionCreateWithoutPlaylistInput, PlaylistCancionUncheckedCreateWithoutPlaylistInput> | PlaylistCancionCreateWithoutPlaylistInput[] | PlaylistCancionUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: PlaylistCancionCreateOrConnectWithoutPlaylistInput | PlaylistCancionCreateOrConnectWithoutPlaylistInput[]
    upsert?: PlaylistCancionUpsertWithWhereUniqueWithoutPlaylistInput | PlaylistCancionUpsertWithWhereUniqueWithoutPlaylistInput[]
    createMany?: PlaylistCancionCreateManyPlaylistInputEnvelope
    set?: PlaylistCancionWhereUniqueInput | PlaylistCancionWhereUniqueInput[]
    disconnect?: PlaylistCancionWhereUniqueInput | PlaylistCancionWhereUniqueInput[]
    delete?: PlaylistCancionWhereUniqueInput | PlaylistCancionWhereUniqueInput[]
    connect?: PlaylistCancionWhereUniqueInput | PlaylistCancionWhereUniqueInput[]
    update?: PlaylistCancionUpdateWithWhereUniqueWithoutPlaylistInput | PlaylistCancionUpdateWithWhereUniqueWithoutPlaylistInput[]
    updateMany?: PlaylistCancionUpdateManyWithWhereWithoutPlaylistInput | PlaylistCancionUpdateManyWithWhereWithoutPlaylistInput[]
    deleteMany?: PlaylistCancionScalarWhereInput | PlaylistCancionScalarWhereInput[]
  }

  export type PlaylistCancionUncheckedUpdateManyWithoutPlaylistNestedInput = {
    create?: XOR<PlaylistCancionCreateWithoutPlaylistInput, PlaylistCancionUncheckedCreateWithoutPlaylistInput> | PlaylistCancionCreateWithoutPlaylistInput[] | PlaylistCancionUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: PlaylistCancionCreateOrConnectWithoutPlaylistInput | PlaylistCancionCreateOrConnectWithoutPlaylistInput[]
    upsert?: PlaylistCancionUpsertWithWhereUniqueWithoutPlaylistInput | PlaylistCancionUpsertWithWhereUniqueWithoutPlaylistInput[]
    createMany?: PlaylistCancionCreateManyPlaylistInputEnvelope
    set?: PlaylistCancionWhereUniqueInput | PlaylistCancionWhereUniqueInput[]
    disconnect?: PlaylistCancionWhereUniqueInput | PlaylistCancionWhereUniqueInput[]
    delete?: PlaylistCancionWhereUniqueInput | PlaylistCancionWhereUniqueInput[]
    connect?: PlaylistCancionWhereUniqueInput | PlaylistCancionWhereUniqueInput[]
    update?: PlaylistCancionUpdateWithWhereUniqueWithoutPlaylistInput | PlaylistCancionUpdateWithWhereUniqueWithoutPlaylistInput[]
    updateMany?: PlaylistCancionUpdateManyWithWhereWithoutPlaylistInput | PlaylistCancionUpdateManyWithWhereWithoutPlaylistInput[]
    deleteMany?: PlaylistCancionScalarWhereInput | PlaylistCancionScalarWhereInput[]
  }

  export type PlaylistCreateNestedOneWithoutCancionesInput = {
    create?: XOR<PlaylistCreateWithoutCancionesInput, PlaylistUncheckedCreateWithoutCancionesInput>
    connectOrCreate?: PlaylistCreateOrConnectWithoutCancionesInput
    connect?: PlaylistWhereUniqueInput
  }

  export type PlaylistUpdateOneRequiredWithoutCancionesNestedInput = {
    create?: XOR<PlaylistCreateWithoutCancionesInput, PlaylistUncheckedCreateWithoutCancionesInput>
    connectOrCreate?: PlaylistCreateOrConnectWithoutCancionesInput
    upsert?: PlaylistUpsertWithoutCancionesInput
    connect?: PlaylistWhereUniqueInput
    update?: XOR<XOR<PlaylistUpdateToOneWithWhereWithoutCancionesInput, PlaylistUpdateWithoutCancionesInput>, PlaylistUncheckedUpdateWithoutCancionesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type PlaylistCancionCreateWithoutPlaylistInput = {
    titulo: string
    artista: string
    duracion: number
    spotifyUri: string
    imagenUrl: string
    orden: number
  }

  export type PlaylistCancionUncheckedCreateWithoutPlaylistInput = {
    id?: number
    titulo: string
    artista: string
    duracion: number
    spotifyUri: string
    imagenUrl: string
    orden: number
  }

  export type PlaylistCancionCreateOrConnectWithoutPlaylistInput = {
    where: PlaylistCancionWhereUniqueInput
    create: XOR<PlaylistCancionCreateWithoutPlaylistInput, PlaylistCancionUncheckedCreateWithoutPlaylistInput>
  }

  export type PlaylistCancionCreateManyPlaylistInputEnvelope = {
    data: PlaylistCancionCreateManyPlaylistInput | PlaylistCancionCreateManyPlaylistInput[]
    skipDuplicates?: boolean
  }

  export type PlaylistCancionUpsertWithWhereUniqueWithoutPlaylistInput = {
    where: PlaylistCancionWhereUniqueInput
    update: XOR<PlaylistCancionUpdateWithoutPlaylistInput, PlaylistCancionUncheckedUpdateWithoutPlaylistInput>
    create: XOR<PlaylistCancionCreateWithoutPlaylistInput, PlaylistCancionUncheckedCreateWithoutPlaylistInput>
  }

  export type PlaylistCancionUpdateWithWhereUniqueWithoutPlaylistInput = {
    where: PlaylistCancionWhereUniqueInput
    data: XOR<PlaylistCancionUpdateWithoutPlaylistInput, PlaylistCancionUncheckedUpdateWithoutPlaylistInput>
  }

  export type PlaylistCancionUpdateManyWithWhereWithoutPlaylistInput = {
    where: PlaylistCancionScalarWhereInput
    data: XOR<PlaylistCancionUpdateManyMutationInput, PlaylistCancionUncheckedUpdateManyWithoutPlaylistInput>
  }

  export type PlaylistCancionScalarWhereInput = {
    AND?: PlaylistCancionScalarWhereInput | PlaylistCancionScalarWhereInput[]
    OR?: PlaylistCancionScalarWhereInput[]
    NOT?: PlaylistCancionScalarWhereInput | PlaylistCancionScalarWhereInput[]
    id?: IntFilter<"PlaylistCancion"> | number
    playlistId?: IntFilter<"PlaylistCancion"> | number
    titulo?: StringFilter<"PlaylistCancion"> | string
    artista?: StringFilter<"PlaylistCancion"> | string
    duracion?: IntFilter<"PlaylistCancion"> | number
    spotifyUri?: StringFilter<"PlaylistCancion"> | string
    imagenUrl?: StringFilter<"PlaylistCancion"> | string
    orden?: IntFilter<"PlaylistCancion"> | number
  }

  export type PlaylistCreateWithoutCancionesInput = {
    nombre: string
    descripcion?: string
    imagenUrl?: string
    esFavoritos?: boolean
    orden?: number
    createdAt?: Date | string
  }

  export type PlaylistUncheckedCreateWithoutCancionesInput = {
    id?: number
    nombre: string
    descripcion?: string
    imagenUrl?: string
    esFavoritos?: boolean
    orden?: number
    createdAt?: Date | string
  }

  export type PlaylistCreateOrConnectWithoutCancionesInput = {
    where: PlaylistWhereUniqueInput
    create: XOR<PlaylistCreateWithoutCancionesInput, PlaylistUncheckedCreateWithoutCancionesInput>
  }

  export type PlaylistUpsertWithoutCancionesInput = {
    update: XOR<PlaylistUpdateWithoutCancionesInput, PlaylistUncheckedUpdateWithoutCancionesInput>
    create: XOR<PlaylistCreateWithoutCancionesInput, PlaylistUncheckedCreateWithoutCancionesInput>
    where?: PlaylistWhereInput
  }

  export type PlaylistUpdateToOneWithWhereWithoutCancionesInput = {
    where?: PlaylistWhereInput
    data: XOR<PlaylistUpdateWithoutCancionesInput, PlaylistUncheckedUpdateWithoutCancionesInput>
  }

  export type PlaylistUpdateWithoutCancionesInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    imagenUrl?: StringFieldUpdateOperationsInput | string
    esFavoritos?: BoolFieldUpdateOperationsInput | boolean
    orden?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaylistUncheckedUpdateWithoutCancionesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    imagenUrl?: StringFieldUpdateOperationsInput | string
    esFavoritos?: BoolFieldUpdateOperationsInput | boolean
    orden?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaylistCancionCreateManyPlaylistInput = {
    id?: number
    titulo: string
    artista: string
    duracion: number
    spotifyUri: string
    imagenUrl: string
    orden: number
  }

  export type PlaylistCancionUpdateWithoutPlaylistInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    artista?: StringFieldUpdateOperationsInput | string
    duracion?: IntFieldUpdateOperationsInput | number
    spotifyUri?: StringFieldUpdateOperationsInput | string
    imagenUrl?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
  }

  export type PlaylistCancionUncheckedUpdateWithoutPlaylistInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    artista?: StringFieldUpdateOperationsInput | string
    duracion?: IntFieldUpdateOperationsInput | number
    spotifyUri?: StringFieldUpdateOperationsInput | string
    imagenUrl?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
  }

  export type PlaylistCancionUncheckedUpdateManyWithoutPlaylistInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    artista?: StringFieldUpdateOperationsInput | string
    duracion?: IntFieldUpdateOperationsInput | number
    spotifyUri?: StringFieldUpdateOperationsInput | string
    imagenUrl?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use PlaylistCountOutputTypeDefaultArgs instead
     */
    export type PlaylistCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlaylistCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PlaylistDefaultArgs instead
     */
    export type PlaylistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlaylistDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PlaylistCancionDefaultArgs instead
     */
    export type PlaylistCancionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlaylistCancionDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}