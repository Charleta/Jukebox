
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
 * Model Config
 * 
 */
export type Config = $Result.DefaultSelection<Prisma.$ConfigPayload>
/**
 * Model AppConfig
 * 
 */
export type AppConfig = $Result.DefaultSelection<Prisma.$AppConfigPayload>
/**
 * Model PagoProcesado
 * 
 */
export type PagoProcesado = $Result.DefaultSelection<Prisma.$PagoProcesadoPayload>
/**
 * Model Cola
 * 
 */
export type Cola = $Result.DefaultSelection<Prisma.$ColaPayload>

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

  /**
   * `prisma.config`: Exposes CRUD operations for the **Config** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Configs
    * const configs = await prisma.config.findMany()
    * ```
    */
  get config(): Prisma.ConfigDelegate<ExtArgs>;

  /**
   * `prisma.appConfig`: Exposes CRUD operations for the **AppConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppConfigs
    * const appConfigs = await prisma.appConfig.findMany()
    * ```
    */
  get appConfig(): Prisma.AppConfigDelegate<ExtArgs>;

  /**
   * `prisma.pagoProcesado`: Exposes CRUD operations for the **PagoProcesado** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PagoProcesados
    * const pagoProcesados = await prisma.pagoProcesado.findMany()
    * ```
    */
  get pagoProcesado(): Prisma.PagoProcesadoDelegate<ExtArgs>;

  /**
   * `prisma.cola`: Exposes CRUD operations for the **Cola** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Colas
    * const colas = await prisma.cola.findMany()
    * ```
    */
  get cola(): Prisma.ColaDelegate<ExtArgs>;
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
    PlaylistCancion: 'PlaylistCancion',
    Config: 'Config',
    AppConfig: 'AppConfig',
    PagoProcesado: 'PagoProcesado',
    Cola: 'Cola'
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
      modelProps: "playlist" | "playlistCancion" | "config" | "appConfig" | "pagoProcesado" | "cola"
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
      Config: {
        payload: Prisma.$ConfigPayload<ExtArgs>
        fields: Prisma.ConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigPayload>
          }
          findFirst: {
            args: Prisma.ConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigPayload>
          }
          findMany: {
            args: Prisma.ConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigPayload>[]
          }
          create: {
            args: Prisma.ConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigPayload>
          }
          createMany: {
            args: Prisma.ConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigPayload>[]
          }
          delete: {
            args: Prisma.ConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigPayload>
          }
          update: {
            args: Prisma.ConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigPayload>
          }
          deleteMany: {
            args: Prisma.ConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfigPayload>
          }
          aggregate: {
            args: Prisma.ConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConfig>
          }
          groupBy: {
            args: Prisma.ConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConfigCountArgs<ExtArgs>
            result: $Utils.Optional<ConfigCountAggregateOutputType> | number
          }
        }
      }
      AppConfig: {
        payload: Prisma.$AppConfigPayload<ExtArgs>
        fields: Prisma.AppConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          findFirst: {
            args: Prisma.AppConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          findMany: {
            args: Prisma.AppConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>[]
          }
          create: {
            args: Prisma.AppConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          createMany: {
            args: Prisma.AppConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>[]
          }
          delete: {
            args: Prisma.AppConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          update: {
            args: Prisma.AppConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          deleteMany: {
            args: Prisma.AppConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AppConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          aggregate: {
            args: Prisma.AppConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppConfig>
          }
          groupBy: {
            args: Prisma.AppConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppConfigCountArgs<ExtArgs>
            result: $Utils.Optional<AppConfigCountAggregateOutputType> | number
          }
        }
      }
      PagoProcesado: {
        payload: Prisma.$PagoProcesadoPayload<ExtArgs>
        fields: Prisma.PagoProcesadoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PagoProcesadoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoProcesadoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PagoProcesadoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoProcesadoPayload>
          }
          findFirst: {
            args: Prisma.PagoProcesadoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoProcesadoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PagoProcesadoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoProcesadoPayload>
          }
          findMany: {
            args: Prisma.PagoProcesadoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoProcesadoPayload>[]
          }
          create: {
            args: Prisma.PagoProcesadoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoProcesadoPayload>
          }
          createMany: {
            args: Prisma.PagoProcesadoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PagoProcesadoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoProcesadoPayload>[]
          }
          delete: {
            args: Prisma.PagoProcesadoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoProcesadoPayload>
          }
          update: {
            args: Prisma.PagoProcesadoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoProcesadoPayload>
          }
          deleteMany: {
            args: Prisma.PagoProcesadoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PagoProcesadoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PagoProcesadoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoProcesadoPayload>
          }
          aggregate: {
            args: Prisma.PagoProcesadoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePagoProcesado>
          }
          groupBy: {
            args: Prisma.PagoProcesadoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PagoProcesadoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PagoProcesadoCountArgs<ExtArgs>
            result: $Utils.Optional<PagoProcesadoCountAggregateOutputType> | number
          }
        }
      }
      Cola: {
        payload: Prisma.$ColaPayload<ExtArgs>
        fields: Prisma.ColaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ColaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ColaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColaPayload>
          }
          findFirst: {
            args: Prisma.ColaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ColaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColaPayload>
          }
          findMany: {
            args: Prisma.ColaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColaPayload>[]
          }
          create: {
            args: Prisma.ColaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColaPayload>
          }
          createMany: {
            args: Prisma.ColaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ColaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColaPayload>[]
          }
          delete: {
            args: Prisma.ColaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColaPayload>
          }
          update: {
            args: Prisma.ColaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColaPayload>
          }
          deleteMany: {
            args: Prisma.ColaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ColaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ColaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColaPayload>
          }
          aggregate: {
            args: Prisma.ColaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCola>
          }
          groupBy: {
            args: Prisma.ColaGroupByArgs<ExtArgs>
            result: $Utils.Optional<ColaGroupByOutputType>[]
          }
          count: {
            args: Prisma.ColaCountArgs<ExtArgs>
            result: $Utils.Optional<ColaCountAggregateOutputType> | number
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
    oculta: boolean | null
    orden: number | null
    createdAt: Date | null
  }

  export type PlaylistMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    descripcion: string | null
    imagenUrl: string | null
    esFavoritos: boolean | null
    oculta: boolean | null
    orden: number | null
    createdAt: Date | null
  }

  export type PlaylistCountAggregateOutputType = {
    id: number
    nombre: number
    descripcion: number
    imagenUrl: number
    esFavoritos: number
    oculta: number
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
    oculta?: true
    orden?: true
    createdAt?: true
  }

  export type PlaylistMaxAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    imagenUrl?: true
    esFavoritos?: true
    oculta?: true
    orden?: true
    createdAt?: true
  }

  export type PlaylistCountAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    imagenUrl?: true
    esFavoritos?: true
    oculta?: true
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
    oculta: boolean
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
    oculta?: boolean
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
    oculta?: boolean
    orden?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["playlist"]>

  export type PlaylistSelectScalar = {
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    imagenUrl?: boolean
    esFavoritos?: boolean
    oculta?: boolean
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
      oculta: boolean
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
    readonly oculta: FieldRef<"Playlist", 'Boolean'>
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
   * Model Config
   */

  export type AggregateConfig = {
    _count: ConfigCountAggregateOutputType | null
    _avg: ConfigAvgAggregateOutputType | null
    _sum: ConfigSumAggregateOutputType | null
    _min: ConfigMinAggregateOutputType | null
    _max: ConfigMaxAggregateOutputType | null
  }

  export type ConfigAvgAggregateOutputType = {
    id: number | null
    fichas: number | null
    fichasHoy: number | null
  }

  export type ConfigSumAggregateOutputType = {
    id: number | null
    fichas: number | null
    fichasHoy: number | null
  }

  export type ConfigMinAggregateOutputType = {
    id: number | null
    fichas: number | null
    fichasHoy: number | null
    fechaHoy: string | null
  }

  export type ConfigMaxAggregateOutputType = {
    id: number | null
    fichas: number | null
    fichasHoy: number | null
    fechaHoy: string | null
  }

  export type ConfigCountAggregateOutputType = {
    id: number
    fichas: number
    fichasHoy: number
    fechaHoy: number
    _all: number
  }


  export type ConfigAvgAggregateInputType = {
    id?: true
    fichas?: true
    fichasHoy?: true
  }

  export type ConfigSumAggregateInputType = {
    id?: true
    fichas?: true
    fichasHoy?: true
  }

  export type ConfigMinAggregateInputType = {
    id?: true
    fichas?: true
    fichasHoy?: true
    fechaHoy?: true
  }

  export type ConfigMaxAggregateInputType = {
    id?: true
    fichas?: true
    fichasHoy?: true
    fechaHoy?: true
  }

  export type ConfigCountAggregateInputType = {
    id?: true
    fichas?: true
    fichasHoy?: true
    fechaHoy?: true
    _all?: true
  }

  export type ConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Config to aggregate.
     */
    where?: ConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configs to fetch.
     */
    orderBy?: ConfigOrderByWithRelationInput | ConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Configs
    **/
    _count?: true | ConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConfigMaxAggregateInputType
  }

  export type GetConfigAggregateType<T extends ConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConfig[P]>
      : GetScalarType<T[P], AggregateConfig[P]>
  }




  export type ConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConfigWhereInput
    orderBy?: ConfigOrderByWithAggregationInput | ConfigOrderByWithAggregationInput[]
    by: ConfigScalarFieldEnum[] | ConfigScalarFieldEnum
    having?: ConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConfigCountAggregateInputType | true
    _avg?: ConfigAvgAggregateInputType
    _sum?: ConfigSumAggregateInputType
    _min?: ConfigMinAggregateInputType
    _max?: ConfigMaxAggregateInputType
  }

  export type ConfigGroupByOutputType = {
    id: number
    fichas: number
    fichasHoy: number
    fechaHoy: string
    _count: ConfigCountAggregateOutputType | null
    _avg: ConfigAvgAggregateOutputType | null
    _sum: ConfigSumAggregateOutputType | null
    _min: ConfigMinAggregateOutputType | null
    _max: ConfigMaxAggregateOutputType | null
  }

  type GetConfigGroupByPayload<T extends ConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConfigGroupByOutputType[P]>
            : GetScalarType<T[P], ConfigGroupByOutputType[P]>
        }
      >
    >


  export type ConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fichas?: boolean
    fichasHoy?: boolean
    fechaHoy?: boolean
  }, ExtArgs["result"]["config"]>

  export type ConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fichas?: boolean
    fichasHoy?: boolean
    fechaHoy?: boolean
  }, ExtArgs["result"]["config"]>

  export type ConfigSelectScalar = {
    id?: boolean
    fichas?: boolean
    fichasHoy?: boolean
    fechaHoy?: boolean
  }


  export type $ConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Config"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      fichas: number
      fichasHoy: number
      fechaHoy: string
    }, ExtArgs["result"]["config"]>
    composites: {}
  }

  type ConfigGetPayload<S extends boolean | null | undefined | ConfigDefaultArgs> = $Result.GetResult<Prisma.$ConfigPayload, S>

  type ConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ConfigFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ConfigCountAggregateInputType | true
    }

  export interface ConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Config'], meta: { name: 'Config' } }
    /**
     * Find zero or one Config that matches the filter.
     * @param {ConfigFindUniqueArgs} args - Arguments to find a Config
     * @example
     * // Get one Config
     * const config = await prisma.config.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConfigFindUniqueArgs>(args: SelectSubset<T, ConfigFindUniqueArgs<ExtArgs>>): Prisma__ConfigClient<$Result.GetResult<Prisma.$ConfigPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Config that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ConfigFindUniqueOrThrowArgs} args - Arguments to find a Config
     * @example
     * // Get one Config
     * const config = await prisma.config.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, ConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConfigClient<$Result.GetResult<Prisma.$ConfigPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Config that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigFindFirstArgs} args - Arguments to find a Config
     * @example
     * // Get one Config
     * const config = await prisma.config.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConfigFindFirstArgs>(args?: SelectSubset<T, ConfigFindFirstArgs<ExtArgs>>): Prisma__ConfigClient<$Result.GetResult<Prisma.$ConfigPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Config that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigFindFirstOrThrowArgs} args - Arguments to find a Config
     * @example
     * // Get one Config
     * const config = await prisma.config.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, ConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConfigClient<$Result.GetResult<Prisma.$ConfigPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Configs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Configs
     * const configs = await prisma.config.findMany()
     * 
     * // Get first 10 Configs
     * const configs = await prisma.config.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const configWithIdOnly = await prisma.config.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConfigFindManyArgs>(args?: SelectSubset<T, ConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfigPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Config.
     * @param {ConfigCreateArgs} args - Arguments to create a Config.
     * @example
     * // Create one Config
     * const Config = await prisma.config.create({
     *   data: {
     *     // ... data to create a Config
     *   }
     * })
     * 
     */
    create<T extends ConfigCreateArgs>(args: SelectSubset<T, ConfigCreateArgs<ExtArgs>>): Prisma__ConfigClient<$Result.GetResult<Prisma.$ConfigPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Configs.
     * @param {ConfigCreateManyArgs} args - Arguments to create many Configs.
     * @example
     * // Create many Configs
     * const config = await prisma.config.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConfigCreateManyArgs>(args?: SelectSubset<T, ConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Configs and returns the data saved in the database.
     * @param {ConfigCreateManyAndReturnArgs} args - Arguments to create many Configs.
     * @example
     * // Create many Configs
     * const config = await prisma.config.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Configs and only return the `id`
     * const configWithIdOnly = await prisma.config.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, ConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfigPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Config.
     * @param {ConfigDeleteArgs} args - Arguments to delete one Config.
     * @example
     * // Delete one Config
     * const Config = await prisma.config.delete({
     *   where: {
     *     // ... filter to delete one Config
     *   }
     * })
     * 
     */
    delete<T extends ConfigDeleteArgs>(args: SelectSubset<T, ConfigDeleteArgs<ExtArgs>>): Prisma__ConfigClient<$Result.GetResult<Prisma.$ConfigPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Config.
     * @param {ConfigUpdateArgs} args - Arguments to update one Config.
     * @example
     * // Update one Config
     * const config = await prisma.config.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConfigUpdateArgs>(args: SelectSubset<T, ConfigUpdateArgs<ExtArgs>>): Prisma__ConfigClient<$Result.GetResult<Prisma.$ConfigPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Configs.
     * @param {ConfigDeleteManyArgs} args - Arguments to filter Configs to delete.
     * @example
     * // Delete a few Configs
     * const { count } = await prisma.config.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConfigDeleteManyArgs>(args?: SelectSubset<T, ConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Configs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Configs
     * const config = await prisma.config.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConfigUpdateManyArgs>(args: SelectSubset<T, ConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Config.
     * @param {ConfigUpsertArgs} args - Arguments to update or create a Config.
     * @example
     * // Update or create a Config
     * const config = await prisma.config.upsert({
     *   create: {
     *     // ... data to create a Config
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Config we want to update
     *   }
     * })
     */
    upsert<T extends ConfigUpsertArgs>(args: SelectSubset<T, ConfigUpsertArgs<ExtArgs>>): Prisma__ConfigClient<$Result.GetResult<Prisma.$ConfigPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Configs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigCountArgs} args - Arguments to filter Configs to count.
     * @example
     * // Count the number of Configs
     * const count = await prisma.config.count({
     *   where: {
     *     // ... the filter for the Configs we want to count
     *   }
     * })
    **/
    count<T extends ConfigCountArgs>(
      args?: Subset<T, ConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Config.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConfigAggregateArgs>(args: Subset<T, ConfigAggregateArgs>): Prisma.PrismaPromise<GetConfigAggregateType<T>>

    /**
     * Group by Config.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfigGroupByArgs} args - Group by arguments.
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
      T extends ConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConfigGroupByArgs['orderBy'] }
        : { orderBy?: ConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Config model
   */
  readonly fields: ConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Config.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Config model
   */ 
  interface ConfigFieldRefs {
    readonly id: FieldRef<"Config", 'Int'>
    readonly fichas: FieldRef<"Config", 'Int'>
    readonly fichasHoy: FieldRef<"Config", 'Int'>
    readonly fechaHoy: FieldRef<"Config", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Config findUnique
   */
  export type ConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelect<ExtArgs> | null
    /**
     * Filter, which Config to fetch.
     */
    where: ConfigWhereUniqueInput
  }

  /**
   * Config findUniqueOrThrow
   */
  export type ConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelect<ExtArgs> | null
    /**
     * Filter, which Config to fetch.
     */
    where: ConfigWhereUniqueInput
  }

  /**
   * Config findFirst
   */
  export type ConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelect<ExtArgs> | null
    /**
     * Filter, which Config to fetch.
     */
    where?: ConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configs to fetch.
     */
    orderBy?: ConfigOrderByWithRelationInput | ConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Configs.
     */
    cursor?: ConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Configs.
     */
    distinct?: ConfigScalarFieldEnum | ConfigScalarFieldEnum[]
  }

  /**
   * Config findFirstOrThrow
   */
  export type ConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelect<ExtArgs> | null
    /**
     * Filter, which Config to fetch.
     */
    where?: ConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configs to fetch.
     */
    orderBy?: ConfigOrderByWithRelationInput | ConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Configs.
     */
    cursor?: ConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Configs.
     */
    distinct?: ConfigScalarFieldEnum | ConfigScalarFieldEnum[]
  }

  /**
   * Config findMany
   */
  export type ConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelect<ExtArgs> | null
    /**
     * Filter, which Configs to fetch.
     */
    where?: ConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configs to fetch.
     */
    orderBy?: ConfigOrderByWithRelationInput | ConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Configs.
     */
    cursor?: ConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configs.
     */
    skip?: number
    distinct?: ConfigScalarFieldEnum | ConfigScalarFieldEnum[]
  }

  /**
   * Config create
   */
  export type ConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelect<ExtArgs> | null
    /**
     * The data needed to create a Config.
     */
    data?: XOR<ConfigCreateInput, ConfigUncheckedCreateInput>
  }

  /**
   * Config createMany
   */
  export type ConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Configs.
     */
    data: ConfigCreateManyInput | ConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Config createManyAndReturn
   */
  export type ConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Configs.
     */
    data: ConfigCreateManyInput | ConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Config update
   */
  export type ConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelect<ExtArgs> | null
    /**
     * The data needed to update a Config.
     */
    data: XOR<ConfigUpdateInput, ConfigUncheckedUpdateInput>
    /**
     * Choose, which Config to update.
     */
    where: ConfigWhereUniqueInput
  }

  /**
   * Config updateMany
   */
  export type ConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Configs.
     */
    data: XOR<ConfigUpdateManyMutationInput, ConfigUncheckedUpdateManyInput>
    /**
     * Filter which Configs to update
     */
    where?: ConfigWhereInput
  }

  /**
   * Config upsert
   */
  export type ConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelect<ExtArgs> | null
    /**
     * The filter to search for the Config to update in case it exists.
     */
    where: ConfigWhereUniqueInput
    /**
     * In case the Config found by the `where` argument doesn't exist, create a new Config with this data.
     */
    create: XOR<ConfigCreateInput, ConfigUncheckedCreateInput>
    /**
     * In case the Config was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConfigUpdateInput, ConfigUncheckedUpdateInput>
  }

  /**
   * Config delete
   */
  export type ConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelect<ExtArgs> | null
    /**
     * Filter which Config to delete.
     */
    where: ConfigWhereUniqueInput
  }

  /**
   * Config deleteMany
   */
  export type ConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Configs to delete
     */
    where?: ConfigWhereInput
  }

  /**
   * Config without action
   */
  export type ConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Config
     */
    select?: ConfigSelect<ExtArgs> | null
  }


  /**
   * Model AppConfig
   */

  export type AggregateAppConfig = {
    _count: AppConfigCountAggregateOutputType | null
    _avg: AppConfigAvgAggregateOutputType | null
    _sum: AppConfigSumAggregateOutputType | null
    _min: AppConfigMinAggregateOutputType | null
    _max: AppConfigMaxAggregateOutputType | null
  }

  export type AppConfigAvgAggregateOutputType = {
    id: number | null
  }

  export type AppConfigSumAggregateOutputType = {
    id: number | null
  }

  export type AppConfigMinAggregateOutputType = {
    id: number | null
    clave: string | null
    valor: string | null
  }

  export type AppConfigMaxAggregateOutputType = {
    id: number | null
    clave: string | null
    valor: string | null
  }

  export type AppConfigCountAggregateOutputType = {
    id: number
    clave: number
    valor: number
    _all: number
  }


  export type AppConfigAvgAggregateInputType = {
    id?: true
  }

  export type AppConfigSumAggregateInputType = {
    id?: true
  }

  export type AppConfigMinAggregateInputType = {
    id?: true
    clave?: true
    valor?: true
  }

  export type AppConfigMaxAggregateInputType = {
    id?: true
    clave?: true
    valor?: true
  }

  export type AppConfigCountAggregateInputType = {
    id?: true
    clave?: true
    valor?: true
    _all?: true
  }

  export type AppConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppConfig to aggregate.
     */
    where?: AppConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppConfigs to fetch.
     */
    orderBy?: AppConfigOrderByWithRelationInput | AppConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AppConfigs
    **/
    _count?: true | AppConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppConfigMaxAggregateInputType
  }

  export type GetAppConfigAggregateType<T extends AppConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateAppConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppConfig[P]>
      : GetScalarType<T[P], AggregateAppConfig[P]>
  }




  export type AppConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppConfigWhereInput
    orderBy?: AppConfigOrderByWithAggregationInput | AppConfigOrderByWithAggregationInput[]
    by: AppConfigScalarFieldEnum[] | AppConfigScalarFieldEnum
    having?: AppConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppConfigCountAggregateInputType | true
    _avg?: AppConfigAvgAggregateInputType
    _sum?: AppConfigSumAggregateInputType
    _min?: AppConfigMinAggregateInputType
    _max?: AppConfigMaxAggregateInputType
  }

  export type AppConfigGroupByOutputType = {
    id: number
    clave: string
    valor: string
    _count: AppConfigCountAggregateOutputType | null
    _avg: AppConfigAvgAggregateOutputType | null
    _sum: AppConfigSumAggregateOutputType | null
    _min: AppConfigMinAggregateOutputType | null
    _max: AppConfigMaxAggregateOutputType | null
  }

  type GetAppConfigGroupByPayload<T extends AppConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppConfigGroupByOutputType[P]>
            : GetScalarType<T[P], AppConfigGroupByOutputType[P]>
        }
      >
    >


  export type AppConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clave?: boolean
    valor?: boolean
  }, ExtArgs["result"]["appConfig"]>

  export type AppConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clave?: boolean
    valor?: boolean
  }, ExtArgs["result"]["appConfig"]>

  export type AppConfigSelectScalar = {
    id?: boolean
    clave?: boolean
    valor?: boolean
  }


  export type $AppConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AppConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      clave: string
      valor: string
    }, ExtArgs["result"]["appConfig"]>
    composites: {}
  }

  type AppConfigGetPayload<S extends boolean | null | undefined | AppConfigDefaultArgs> = $Result.GetResult<Prisma.$AppConfigPayload, S>

  type AppConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AppConfigFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AppConfigCountAggregateInputType | true
    }

  export interface AppConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AppConfig'], meta: { name: 'AppConfig' } }
    /**
     * Find zero or one AppConfig that matches the filter.
     * @param {AppConfigFindUniqueArgs} args - Arguments to find a AppConfig
     * @example
     * // Get one AppConfig
     * const appConfig = await prisma.appConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppConfigFindUniqueArgs>(args: SelectSubset<T, AppConfigFindUniqueArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AppConfig that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AppConfigFindUniqueOrThrowArgs} args - Arguments to find a AppConfig
     * @example
     * // Get one AppConfig
     * const appConfig = await prisma.appConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, AppConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AppConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigFindFirstArgs} args - Arguments to find a AppConfig
     * @example
     * // Get one AppConfig
     * const appConfig = await prisma.appConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppConfigFindFirstArgs>(args?: SelectSubset<T, AppConfigFindFirstArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AppConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigFindFirstOrThrowArgs} args - Arguments to find a AppConfig
     * @example
     * // Get one AppConfig
     * const appConfig = await prisma.appConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, AppConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AppConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppConfigs
     * const appConfigs = await prisma.appConfig.findMany()
     * 
     * // Get first 10 AppConfigs
     * const appConfigs = await prisma.appConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appConfigWithIdOnly = await prisma.appConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppConfigFindManyArgs>(args?: SelectSubset<T, AppConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AppConfig.
     * @param {AppConfigCreateArgs} args - Arguments to create a AppConfig.
     * @example
     * // Create one AppConfig
     * const AppConfig = await prisma.appConfig.create({
     *   data: {
     *     // ... data to create a AppConfig
     *   }
     * })
     * 
     */
    create<T extends AppConfigCreateArgs>(args: SelectSubset<T, AppConfigCreateArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AppConfigs.
     * @param {AppConfigCreateManyArgs} args - Arguments to create many AppConfigs.
     * @example
     * // Create many AppConfigs
     * const appConfig = await prisma.appConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppConfigCreateManyArgs>(args?: SelectSubset<T, AppConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AppConfigs and returns the data saved in the database.
     * @param {AppConfigCreateManyAndReturnArgs} args - Arguments to create many AppConfigs.
     * @example
     * // Create many AppConfigs
     * const appConfig = await prisma.appConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AppConfigs and only return the `id`
     * const appConfigWithIdOnly = await prisma.appConfig.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, AppConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AppConfig.
     * @param {AppConfigDeleteArgs} args - Arguments to delete one AppConfig.
     * @example
     * // Delete one AppConfig
     * const AppConfig = await prisma.appConfig.delete({
     *   where: {
     *     // ... filter to delete one AppConfig
     *   }
     * })
     * 
     */
    delete<T extends AppConfigDeleteArgs>(args: SelectSubset<T, AppConfigDeleteArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AppConfig.
     * @param {AppConfigUpdateArgs} args - Arguments to update one AppConfig.
     * @example
     * // Update one AppConfig
     * const appConfig = await prisma.appConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppConfigUpdateArgs>(args: SelectSubset<T, AppConfigUpdateArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AppConfigs.
     * @param {AppConfigDeleteManyArgs} args - Arguments to filter AppConfigs to delete.
     * @example
     * // Delete a few AppConfigs
     * const { count } = await prisma.appConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppConfigDeleteManyArgs>(args?: SelectSubset<T, AppConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppConfigs
     * const appConfig = await prisma.appConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppConfigUpdateManyArgs>(args: SelectSubset<T, AppConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AppConfig.
     * @param {AppConfigUpsertArgs} args - Arguments to update or create a AppConfig.
     * @example
     * // Update or create a AppConfig
     * const appConfig = await prisma.appConfig.upsert({
     *   create: {
     *     // ... data to create a AppConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppConfig we want to update
     *   }
     * })
     */
    upsert<T extends AppConfigUpsertArgs>(args: SelectSubset<T, AppConfigUpsertArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AppConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigCountArgs} args - Arguments to filter AppConfigs to count.
     * @example
     * // Count the number of AppConfigs
     * const count = await prisma.appConfig.count({
     *   where: {
     *     // ... the filter for the AppConfigs we want to count
     *   }
     * })
    **/
    count<T extends AppConfigCountArgs>(
      args?: Subset<T, AppConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AppConfigAggregateArgs>(args: Subset<T, AppConfigAggregateArgs>): Prisma.PrismaPromise<GetAppConfigAggregateType<T>>

    /**
     * Group by AppConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigGroupByArgs} args - Group by arguments.
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
      T extends AppConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppConfigGroupByArgs['orderBy'] }
        : { orderBy?: AppConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AppConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AppConfig model
   */
  readonly fields: AppConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AppConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the AppConfig model
   */ 
  interface AppConfigFieldRefs {
    readonly id: FieldRef<"AppConfig", 'Int'>
    readonly clave: FieldRef<"AppConfig", 'String'>
    readonly valor: FieldRef<"AppConfig", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AppConfig findUnique
   */
  export type AppConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Filter, which AppConfig to fetch.
     */
    where: AppConfigWhereUniqueInput
  }

  /**
   * AppConfig findUniqueOrThrow
   */
  export type AppConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Filter, which AppConfig to fetch.
     */
    where: AppConfigWhereUniqueInput
  }

  /**
   * AppConfig findFirst
   */
  export type AppConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Filter, which AppConfig to fetch.
     */
    where?: AppConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppConfigs to fetch.
     */
    orderBy?: AppConfigOrderByWithRelationInput | AppConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppConfigs.
     */
    cursor?: AppConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppConfigs.
     */
    distinct?: AppConfigScalarFieldEnum | AppConfigScalarFieldEnum[]
  }

  /**
   * AppConfig findFirstOrThrow
   */
  export type AppConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Filter, which AppConfig to fetch.
     */
    where?: AppConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppConfigs to fetch.
     */
    orderBy?: AppConfigOrderByWithRelationInput | AppConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppConfigs.
     */
    cursor?: AppConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppConfigs.
     */
    distinct?: AppConfigScalarFieldEnum | AppConfigScalarFieldEnum[]
  }

  /**
   * AppConfig findMany
   */
  export type AppConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Filter, which AppConfigs to fetch.
     */
    where?: AppConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppConfigs to fetch.
     */
    orderBy?: AppConfigOrderByWithRelationInput | AppConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AppConfigs.
     */
    cursor?: AppConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppConfigs.
     */
    skip?: number
    distinct?: AppConfigScalarFieldEnum | AppConfigScalarFieldEnum[]
  }

  /**
   * AppConfig create
   */
  export type AppConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * The data needed to create a AppConfig.
     */
    data: XOR<AppConfigCreateInput, AppConfigUncheckedCreateInput>
  }

  /**
   * AppConfig createMany
   */
  export type AppConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AppConfigs.
     */
    data: AppConfigCreateManyInput | AppConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppConfig createManyAndReturn
   */
  export type AppConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AppConfigs.
     */
    data: AppConfigCreateManyInput | AppConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppConfig update
   */
  export type AppConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * The data needed to update a AppConfig.
     */
    data: XOR<AppConfigUpdateInput, AppConfigUncheckedUpdateInput>
    /**
     * Choose, which AppConfig to update.
     */
    where: AppConfigWhereUniqueInput
  }

  /**
   * AppConfig updateMany
   */
  export type AppConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AppConfigs.
     */
    data: XOR<AppConfigUpdateManyMutationInput, AppConfigUncheckedUpdateManyInput>
    /**
     * Filter which AppConfigs to update
     */
    where?: AppConfigWhereInput
  }

  /**
   * AppConfig upsert
   */
  export type AppConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * The filter to search for the AppConfig to update in case it exists.
     */
    where: AppConfigWhereUniqueInput
    /**
     * In case the AppConfig found by the `where` argument doesn't exist, create a new AppConfig with this data.
     */
    create: XOR<AppConfigCreateInput, AppConfigUncheckedCreateInput>
    /**
     * In case the AppConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppConfigUpdateInput, AppConfigUncheckedUpdateInput>
  }

  /**
   * AppConfig delete
   */
  export type AppConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Filter which AppConfig to delete.
     */
    where: AppConfigWhereUniqueInput
  }

  /**
   * AppConfig deleteMany
   */
  export type AppConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppConfigs to delete
     */
    where?: AppConfigWhereInput
  }

  /**
   * AppConfig without action
   */
  export type AppConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
  }


  /**
   * Model PagoProcesado
   */

  export type AggregatePagoProcesado = {
    _count: PagoProcesadoCountAggregateOutputType | null
    _min: PagoProcesadoMinAggregateOutputType | null
    _max: PagoProcesadoMaxAggregateOutputType | null
  }

  export type PagoProcesadoMinAggregateOutputType = {
    ref: string | null
    creadoEn: Date | null
  }

  export type PagoProcesadoMaxAggregateOutputType = {
    ref: string | null
    creadoEn: Date | null
  }

  export type PagoProcesadoCountAggregateOutputType = {
    ref: number
    creadoEn: number
    _all: number
  }


  export type PagoProcesadoMinAggregateInputType = {
    ref?: true
    creadoEn?: true
  }

  export type PagoProcesadoMaxAggregateInputType = {
    ref?: true
    creadoEn?: true
  }

  export type PagoProcesadoCountAggregateInputType = {
    ref?: true
    creadoEn?: true
    _all?: true
  }

  export type PagoProcesadoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PagoProcesado to aggregate.
     */
    where?: PagoProcesadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PagoProcesados to fetch.
     */
    orderBy?: PagoProcesadoOrderByWithRelationInput | PagoProcesadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PagoProcesadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PagoProcesados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PagoProcesados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PagoProcesados
    **/
    _count?: true | PagoProcesadoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PagoProcesadoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PagoProcesadoMaxAggregateInputType
  }

  export type GetPagoProcesadoAggregateType<T extends PagoProcesadoAggregateArgs> = {
        [P in keyof T & keyof AggregatePagoProcesado]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePagoProcesado[P]>
      : GetScalarType<T[P], AggregatePagoProcesado[P]>
  }




  export type PagoProcesadoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PagoProcesadoWhereInput
    orderBy?: PagoProcesadoOrderByWithAggregationInput | PagoProcesadoOrderByWithAggregationInput[]
    by: PagoProcesadoScalarFieldEnum[] | PagoProcesadoScalarFieldEnum
    having?: PagoProcesadoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PagoProcesadoCountAggregateInputType | true
    _min?: PagoProcesadoMinAggregateInputType
    _max?: PagoProcesadoMaxAggregateInputType
  }

  export type PagoProcesadoGroupByOutputType = {
    ref: string
    creadoEn: Date
    _count: PagoProcesadoCountAggregateOutputType | null
    _min: PagoProcesadoMinAggregateOutputType | null
    _max: PagoProcesadoMaxAggregateOutputType | null
  }

  type GetPagoProcesadoGroupByPayload<T extends PagoProcesadoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PagoProcesadoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PagoProcesadoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PagoProcesadoGroupByOutputType[P]>
            : GetScalarType<T[P], PagoProcesadoGroupByOutputType[P]>
        }
      >
    >


  export type PagoProcesadoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ref?: boolean
    creadoEn?: boolean
  }, ExtArgs["result"]["pagoProcesado"]>

  export type PagoProcesadoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ref?: boolean
    creadoEn?: boolean
  }, ExtArgs["result"]["pagoProcesado"]>

  export type PagoProcesadoSelectScalar = {
    ref?: boolean
    creadoEn?: boolean
  }


  export type $PagoProcesadoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PagoProcesado"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      ref: string
      creadoEn: Date
    }, ExtArgs["result"]["pagoProcesado"]>
    composites: {}
  }

  type PagoProcesadoGetPayload<S extends boolean | null | undefined | PagoProcesadoDefaultArgs> = $Result.GetResult<Prisma.$PagoProcesadoPayload, S>

  type PagoProcesadoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PagoProcesadoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PagoProcesadoCountAggregateInputType | true
    }

  export interface PagoProcesadoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PagoProcesado'], meta: { name: 'PagoProcesado' } }
    /**
     * Find zero or one PagoProcesado that matches the filter.
     * @param {PagoProcesadoFindUniqueArgs} args - Arguments to find a PagoProcesado
     * @example
     * // Get one PagoProcesado
     * const pagoProcesado = await prisma.pagoProcesado.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PagoProcesadoFindUniqueArgs>(args: SelectSubset<T, PagoProcesadoFindUniqueArgs<ExtArgs>>): Prisma__PagoProcesadoClient<$Result.GetResult<Prisma.$PagoProcesadoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PagoProcesado that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PagoProcesadoFindUniqueOrThrowArgs} args - Arguments to find a PagoProcesado
     * @example
     * // Get one PagoProcesado
     * const pagoProcesado = await prisma.pagoProcesado.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PagoProcesadoFindUniqueOrThrowArgs>(args: SelectSubset<T, PagoProcesadoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PagoProcesadoClient<$Result.GetResult<Prisma.$PagoProcesadoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PagoProcesado that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoProcesadoFindFirstArgs} args - Arguments to find a PagoProcesado
     * @example
     * // Get one PagoProcesado
     * const pagoProcesado = await prisma.pagoProcesado.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PagoProcesadoFindFirstArgs>(args?: SelectSubset<T, PagoProcesadoFindFirstArgs<ExtArgs>>): Prisma__PagoProcesadoClient<$Result.GetResult<Prisma.$PagoProcesadoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PagoProcesado that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoProcesadoFindFirstOrThrowArgs} args - Arguments to find a PagoProcesado
     * @example
     * // Get one PagoProcesado
     * const pagoProcesado = await prisma.pagoProcesado.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PagoProcesadoFindFirstOrThrowArgs>(args?: SelectSubset<T, PagoProcesadoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PagoProcesadoClient<$Result.GetResult<Prisma.$PagoProcesadoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PagoProcesados that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoProcesadoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PagoProcesados
     * const pagoProcesados = await prisma.pagoProcesado.findMany()
     * 
     * // Get first 10 PagoProcesados
     * const pagoProcesados = await prisma.pagoProcesado.findMany({ take: 10 })
     * 
     * // Only select the `ref`
     * const pagoProcesadoWithRefOnly = await prisma.pagoProcesado.findMany({ select: { ref: true } })
     * 
     */
    findMany<T extends PagoProcesadoFindManyArgs>(args?: SelectSubset<T, PagoProcesadoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagoProcesadoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PagoProcesado.
     * @param {PagoProcesadoCreateArgs} args - Arguments to create a PagoProcesado.
     * @example
     * // Create one PagoProcesado
     * const PagoProcesado = await prisma.pagoProcesado.create({
     *   data: {
     *     // ... data to create a PagoProcesado
     *   }
     * })
     * 
     */
    create<T extends PagoProcesadoCreateArgs>(args: SelectSubset<T, PagoProcesadoCreateArgs<ExtArgs>>): Prisma__PagoProcesadoClient<$Result.GetResult<Prisma.$PagoProcesadoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PagoProcesados.
     * @param {PagoProcesadoCreateManyArgs} args - Arguments to create many PagoProcesados.
     * @example
     * // Create many PagoProcesados
     * const pagoProcesado = await prisma.pagoProcesado.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PagoProcesadoCreateManyArgs>(args?: SelectSubset<T, PagoProcesadoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PagoProcesados and returns the data saved in the database.
     * @param {PagoProcesadoCreateManyAndReturnArgs} args - Arguments to create many PagoProcesados.
     * @example
     * // Create many PagoProcesados
     * const pagoProcesado = await prisma.pagoProcesado.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PagoProcesados and only return the `ref`
     * const pagoProcesadoWithRefOnly = await prisma.pagoProcesado.createManyAndReturn({ 
     *   select: { ref: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PagoProcesadoCreateManyAndReturnArgs>(args?: SelectSubset<T, PagoProcesadoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagoProcesadoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PagoProcesado.
     * @param {PagoProcesadoDeleteArgs} args - Arguments to delete one PagoProcesado.
     * @example
     * // Delete one PagoProcesado
     * const PagoProcesado = await prisma.pagoProcesado.delete({
     *   where: {
     *     // ... filter to delete one PagoProcesado
     *   }
     * })
     * 
     */
    delete<T extends PagoProcesadoDeleteArgs>(args: SelectSubset<T, PagoProcesadoDeleteArgs<ExtArgs>>): Prisma__PagoProcesadoClient<$Result.GetResult<Prisma.$PagoProcesadoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PagoProcesado.
     * @param {PagoProcesadoUpdateArgs} args - Arguments to update one PagoProcesado.
     * @example
     * // Update one PagoProcesado
     * const pagoProcesado = await prisma.pagoProcesado.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PagoProcesadoUpdateArgs>(args: SelectSubset<T, PagoProcesadoUpdateArgs<ExtArgs>>): Prisma__PagoProcesadoClient<$Result.GetResult<Prisma.$PagoProcesadoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PagoProcesados.
     * @param {PagoProcesadoDeleteManyArgs} args - Arguments to filter PagoProcesados to delete.
     * @example
     * // Delete a few PagoProcesados
     * const { count } = await prisma.pagoProcesado.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PagoProcesadoDeleteManyArgs>(args?: SelectSubset<T, PagoProcesadoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PagoProcesados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoProcesadoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PagoProcesados
     * const pagoProcesado = await prisma.pagoProcesado.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PagoProcesadoUpdateManyArgs>(args: SelectSubset<T, PagoProcesadoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PagoProcesado.
     * @param {PagoProcesadoUpsertArgs} args - Arguments to update or create a PagoProcesado.
     * @example
     * // Update or create a PagoProcesado
     * const pagoProcesado = await prisma.pagoProcesado.upsert({
     *   create: {
     *     // ... data to create a PagoProcesado
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PagoProcesado we want to update
     *   }
     * })
     */
    upsert<T extends PagoProcesadoUpsertArgs>(args: SelectSubset<T, PagoProcesadoUpsertArgs<ExtArgs>>): Prisma__PagoProcesadoClient<$Result.GetResult<Prisma.$PagoProcesadoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PagoProcesados.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoProcesadoCountArgs} args - Arguments to filter PagoProcesados to count.
     * @example
     * // Count the number of PagoProcesados
     * const count = await prisma.pagoProcesado.count({
     *   where: {
     *     // ... the filter for the PagoProcesados we want to count
     *   }
     * })
    **/
    count<T extends PagoProcesadoCountArgs>(
      args?: Subset<T, PagoProcesadoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PagoProcesadoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PagoProcesado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoProcesadoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PagoProcesadoAggregateArgs>(args: Subset<T, PagoProcesadoAggregateArgs>): Prisma.PrismaPromise<GetPagoProcesadoAggregateType<T>>

    /**
     * Group by PagoProcesado.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoProcesadoGroupByArgs} args - Group by arguments.
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
      T extends PagoProcesadoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PagoProcesadoGroupByArgs['orderBy'] }
        : { orderBy?: PagoProcesadoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PagoProcesadoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPagoProcesadoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PagoProcesado model
   */
  readonly fields: PagoProcesadoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PagoProcesado.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PagoProcesadoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the PagoProcesado model
   */ 
  interface PagoProcesadoFieldRefs {
    readonly ref: FieldRef<"PagoProcesado", 'String'>
    readonly creadoEn: FieldRef<"PagoProcesado", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PagoProcesado findUnique
   */
  export type PagoProcesadoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagoProcesado
     */
    select?: PagoProcesadoSelect<ExtArgs> | null
    /**
     * Filter, which PagoProcesado to fetch.
     */
    where: PagoProcesadoWhereUniqueInput
  }

  /**
   * PagoProcesado findUniqueOrThrow
   */
  export type PagoProcesadoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagoProcesado
     */
    select?: PagoProcesadoSelect<ExtArgs> | null
    /**
     * Filter, which PagoProcesado to fetch.
     */
    where: PagoProcesadoWhereUniqueInput
  }

  /**
   * PagoProcesado findFirst
   */
  export type PagoProcesadoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagoProcesado
     */
    select?: PagoProcesadoSelect<ExtArgs> | null
    /**
     * Filter, which PagoProcesado to fetch.
     */
    where?: PagoProcesadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PagoProcesados to fetch.
     */
    orderBy?: PagoProcesadoOrderByWithRelationInput | PagoProcesadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PagoProcesados.
     */
    cursor?: PagoProcesadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PagoProcesados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PagoProcesados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PagoProcesados.
     */
    distinct?: PagoProcesadoScalarFieldEnum | PagoProcesadoScalarFieldEnum[]
  }

  /**
   * PagoProcesado findFirstOrThrow
   */
  export type PagoProcesadoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagoProcesado
     */
    select?: PagoProcesadoSelect<ExtArgs> | null
    /**
     * Filter, which PagoProcesado to fetch.
     */
    where?: PagoProcesadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PagoProcesados to fetch.
     */
    orderBy?: PagoProcesadoOrderByWithRelationInput | PagoProcesadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PagoProcesados.
     */
    cursor?: PagoProcesadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PagoProcesados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PagoProcesados.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PagoProcesados.
     */
    distinct?: PagoProcesadoScalarFieldEnum | PagoProcesadoScalarFieldEnum[]
  }

  /**
   * PagoProcesado findMany
   */
  export type PagoProcesadoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagoProcesado
     */
    select?: PagoProcesadoSelect<ExtArgs> | null
    /**
     * Filter, which PagoProcesados to fetch.
     */
    where?: PagoProcesadoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PagoProcesados to fetch.
     */
    orderBy?: PagoProcesadoOrderByWithRelationInput | PagoProcesadoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PagoProcesados.
     */
    cursor?: PagoProcesadoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PagoProcesados from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PagoProcesados.
     */
    skip?: number
    distinct?: PagoProcesadoScalarFieldEnum | PagoProcesadoScalarFieldEnum[]
  }

  /**
   * PagoProcesado create
   */
  export type PagoProcesadoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagoProcesado
     */
    select?: PagoProcesadoSelect<ExtArgs> | null
    /**
     * The data needed to create a PagoProcesado.
     */
    data: XOR<PagoProcesadoCreateInput, PagoProcesadoUncheckedCreateInput>
  }

  /**
   * PagoProcesado createMany
   */
  export type PagoProcesadoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PagoProcesados.
     */
    data: PagoProcesadoCreateManyInput | PagoProcesadoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PagoProcesado createManyAndReturn
   */
  export type PagoProcesadoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagoProcesado
     */
    select?: PagoProcesadoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PagoProcesados.
     */
    data: PagoProcesadoCreateManyInput | PagoProcesadoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PagoProcesado update
   */
  export type PagoProcesadoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagoProcesado
     */
    select?: PagoProcesadoSelect<ExtArgs> | null
    /**
     * The data needed to update a PagoProcesado.
     */
    data: XOR<PagoProcesadoUpdateInput, PagoProcesadoUncheckedUpdateInput>
    /**
     * Choose, which PagoProcesado to update.
     */
    where: PagoProcesadoWhereUniqueInput
  }

  /**
   * PagoProcesado updateMany
   */
  export type PagoProcesadoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PagoProcesados.
     */
    data: XOR<PagoProcesadoUpdateManyMutationInput, PagoProcesadoUncheckedUpdateManyInput>
    /**
     * Filter which PagoProcesados to update
     */
    where?: PagoProcesadoWhereInput
  }

  /**
   * PagoProcesado upsert
   */
  export type PagoProcesadoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagoProcesado
     */
    select?: PagoProcesadoSelect<ExtArgs> | null
    /**
     * The filter to search for the PagoProcesado to update in case it exists.
     */
    where: PagoProcesadoWhereUniqueInput
    /**
     * In case the PagoProcesado found by the `where` argument doesn't exist, create a new PagoProcesado with this data.
     */
    create: XOR<PagoProcesadoCreateInput, PagoProcesadoUncheckedCreateInput>
    /**
     * In case the PagoProcesado was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PagoProcesadoUpdateInput, PagoProcesadoUncheckedUpdateInput>
  }

  /**
   * PagoProcesado delete
   */
  export type PagoProcesadoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagoProcesado
     */
    select?: PagoProcesadoSelect<ExtArgs> | null
    /**
     * Filter which PagoProcesado to delete.
     */
    where: PagoProcesadoWhereUniqueInput
  }

  /**
   * PagoProcesado deleteMany
   */
  export type PagoProcesadoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PagoProcesados to delete
     */
    where?: PagoProcesadoWhereInput
  }

  /**
   * PagoProcesado without action
   */
  export type PagoProcesadoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PagoProcesado
     */
    select?: PagoProcesadoSelect<ExtArgs> | null
  }


  /**
   * Model Cola
   */

  export type AggregateCola = {
    _count: ColaCountAggregateOutputType | null
    _avg: ColaAvgAggregateOutputType | null
    _sum: ColaSumAggregateOutputType | null
    _min: ColaMinAggregateOutputType | null
    _max: ColaMaxAggregateOutputType | null
  }

  export type ColaAvgAggregateOutputType = {
    id: number | null
    duracion: number | null
    orden: number | null
  }

  export type ColaSumAggregateOutputType = {
    id: number | null
    duracion: number | null
    orden: number | null
  }

  export type ColaMinAggregateOutputType = {
    id: number | null
    titulo: string | null
    artista: string | null
    duracion: number | null
    spotifyUri: string | null
    imagenUrl: string | null
    orden: number | null
    tipo: string | null
    createdAt: Date | null
  }

  export type ColaMaxAggregateOutputType = {
    id: number | null
    titulo: string | null
    artista: string | null
    duracion: number | null
    spotifyUri: string | null
    imagenUrl: string | null
    orden: number | null
    tipo: string | null
    createdAt: Date | null
  }

  export type ColaCountAggregateOutputType = {
    id: number
    titulo: number
    artista: number
    duracion: number
    spotifyUri: number
    imagenUrl: number
    orden: number
    tipo: number
    createdAt: number
    _all: number
  }


  export type ColaAvgAggregateInputType = {
    id?: true
    duracion?: true
    orden?: true
  }

  export type ColaSumAggregateInputType = {
    id?: true
    duracion?: true
    orden?: true
  }

  export type ColaMinAggregateInputType = {
    id?: true
    titulo?: true
    artista?: true
    duracion?: true
    spotifyUri?: true
    imagenUrl?: true
    orden?: true
    tipo?: true
    createdAt?: true
  }

  export type ColaMaxAggregateInputType = {
    id?: true
    titulo?: true
    artista?: true
    duracion?: true
    spotifyUri?: true
    imagenUrl?: true
    orden?: true
    tipo?: true
    createdAt?: true
  }

  export type ColaCountAggregateInputType = {
    id?: true
    titulo?: true
    artista?: true
    duracion?: true
    spotifyUri?: true
    imagenUrl?: true
    orden?: true
    tipo?: true
    createdAt?: true
    _all?: true
  }

  export type ColaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cola to aggregate.
     */
    where?: ColaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colas to fetch.
     */
    orderBy?: ColaOrderByWithRelationInput | ColaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ColaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Colas
    **/
    _count?: true | ColaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ColaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ColaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ColaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ColaMaxAggregateInputType
  }

  export type GetColaAggregateType<T extends ColaAggregateArgs> = {
        [P in keyof T & keyof AggregateCola]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCola[P]>
      : GetScalarType<T[P], AggregateCola[P]>
  }




  export type ColaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColaWhereInput
    orderBy?: ColaOrderByWithAggregationInput | ColaOrderByWithAggregationInput[]
    by: ColaScalarFieldEnum[] | ColaScalarFieldEnum
    having?: ColaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ColaCountAggregateInputType | true
    _avg?: ColaAvgAggregateInputType
    _sum?: ColaSumAggregateInputType
    _min?: ColaMinAggregateInputType
    _max?: ColaMaxAggregateInputType
  }

  export type ColaGroupByOutputType = {
    id: number
    titulo: string
    artista: string
    duracion: number
    spotifyUri: string
    imagenUrl: string
    orden: number
    tipo: string
    createdAt: Date
    _count: ColaCountAggregateOutputType | null
    _avg: ColaAvgAggregateOutputType | null
    _sum: ColaSumAggregateOutputType | null
    _min: ColaMinAggregateOutputType | null
    _max: ColaMaxAggregateOutputType | null
  }

  type GetColaGroupByPayload<T extends ColaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ColaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ColaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ColaGroupByOutputType[P]>
            : GetScalarType<T[P], ColaGroupByOutputType[P]>
        }
      >
    >


  export type ColaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    artista?: boolean
    duracion?: boolean
    spotifyUri?: boolean
    imagenUrl?: boolean
    orden?: boolean
    tipo?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["cola"]>

  export type ColaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    artista?: boolean
    duracion?: boolean
    spotifyUri?: boolean
    imagenUrl?: boolean
    orden?: boolean
    tipo?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["cola"]>

  export type ColaSelectScalar = {
    id?: boolean
    titulo?: boolean
    artista?: boolean
    duracion?: boolean
    spotifyUri?: boolean
    imagenUrl?: boolean
    orden?: boolean
    tipo?: boolean
    createdAt?: boolean
  }


  export type $ColaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cola"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      titulo: string
      artista: string
      duracion: number
      spotifyUri: string
      imagenUrl: string
      orden: number
      tipo: string
      createdAt: Date
    }, ExtArgs["result"]["cola"]>
    composites: {}
  }

  type ColaGetPayload<S extends boolean | null | undefined | ColaDefaultArgs> = $Result.GetResult<Prisma.$ColaPayload, S>

  type ColaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ColaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ColaCountAggregateInputType | true
    }

  export interface ColaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cola'], meta: { name: 'Cola' } }
    /**
     * Find zero or one Cola that matches the filter.
     * @param {ColaFindUniqueArgs} args - Arguments to find a Cola
     * @example
     * // Get one Cola
     * const cola = await prisma.cola.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ColaFindUniqueArgs>(args: SelectSubset<T, ColaFindUniqueArgs<ExtArgs>>): Prisma__ColaClient<$Result.GetResult<Prisma.$ColaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Cola that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ColaFindUniqueOrThrowArgs} args - Arguments to find a Cola
     * @example
     * // Get one Cola
     * const cola = await prisma.cola.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ColaFindUniqueOrThrowArgs>(args: SelectSubset<T, ColaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ColaClient<$Result.GetResult<Prisma.$ColaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Cola that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColaFindFirstArgs} args - Arguments to find a Cola
     * @example
     * // Get one Cola
     * const cola = await prisma.cola.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ColaFindFirstArgs>(args?: SelectSubset<T, ColaFindFirstArgs<ExtArgs>>): Prisma__ColaClient<$Result.GetResult<Prisma.$ColaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Cola that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColaFindFirstOrThrowArgs} args - Arguments to find a Cola
     * @example
     * // Get one Cola
     * const cola = await prisma.cola.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ColaFindFirstOrThrowArgs>(args?: SelectSubset<T, ColaFindFirstOrThrowArgs<ExtArgs>>): Prisma__ColaClient<$Result.GetResult<Prisma.$ColaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Colas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Colas
     * const colas = await prisma.cola.findMany()
     * 
     * // Get first 10 Colas
     * const colas = await prisma.cola.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const colaWithIdOnly = await prisma.cola.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ColaFindManyArgs>(args?: SelectSubset<T, ColaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Cola.
     * @param {ColaCreateArgs} args - Arguments to create a Cola.
     * @example
     * // Create one Cola
     * const Cola = await prisma.cola.create({
     *   data: {
     *     // ... data to create a Cola
     *   }
     * })
     * 
     */
    create<T extends ColaCreateArgs>(args: SelectSubset<T, ColaCreateArgs<ExtArgs>>): Prisma__ColaClient<$Result.GetResult<Prisma.$ColaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Colas.
     * @param {ColaCreateManyArgs} args - Arguments to create many Colas.
     * @example
     * // Create many Colas
     * const cola = await prisma.cola.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ColaCreateManyArgs>(args?: SelectSubset<T, ColaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Colas and returns the data saved in the database.
     * @param {ColaCreateManyAndReturnArgs} args - Arguments to create many Colas.
     * @example
     * // Create many Colas
     * const cola = await prisma.cola.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Colas and only return the `id`
     * const colaWithIdOnly = await prisma.cola.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ColaCreateManyAndReturnArgs>(args?: SelectSubset<T, ColaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Cola.
     * @param {ColaDeleteArgs} args - Arguments to delete one Cola.
     * @example
     * // Delete one Cola
     * const Cola = await prisma.cola.delete({
     *   where: {
     *     // ... filter to delete one Cola
     *   }
     * })
     * 
     */
    delete<T extends ColaDeleteArgs>(args: SelectSubset<T, ColaDeleteArgs<ExtArgs>>): Prisma__ColaClient<$Result.GetResult<Prisma.$ColaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Cola.
     * @param {ColaUpdateArgs} args - Arguments to update one Cola.
     * @example
     * // Update one Cola
     * const cola = await prisma.cola.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ColaUpdateArgs>(args: SelectSubset<T, ColaUpdateArgs<ExtArgs>>): Prisma__ColaClient<$Result.GetResult<Prisma.$ColaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Colas.
     * @param {ColaDeleteManyArgs} args - Arguments to filter Colas to delete.
     * @example
     * // Delete a few Colas
     * const { count } = await prisma.cola.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ColaDeleteManyArgs>(args?: SelectSubset<T, ColaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Colas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Colas
     * const cola = await prisma.cola.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ColaUpdateManyArgs>(args: SelectSubset<T, ColaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Cola.
     * @param {ColaUpsertArgs} args - Arguments to update or create a Cola.
     * @example
     * // Update or create a Cola
     * const cola = await prisma.cola.upsert({
     *   create: {
     *     // ... data to create a Cola
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cola we want to update
     *   }
     * })
     */
    upsert<T extends ColaUpsertArgs>(args: SelectSubset<T, ColaUpsertArgs<ExtArgs>>): Prisma__ColaClient<$Result.GetResult<Prisma.$ColaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Colas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColaCountArgs} args - Arguments to filter Colas to count.
     * @example
     * // Count the number of Colas
     * const count = await prisma.cola.count({
     *   where: {
     *     // ... the filter for the Colas we want to count
     *   }
     * })
    **/
    count<T extends ColaCountArgs>(
      args?: Subset<T, ColaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ColaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cola.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ColaAggregateArgs>(args: Subset<T, ColaAggregateArgs>): Prisma.PrismaPromise<GetColaAggregateType<T>>

    /**
     * Group by Cola.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColaGroupByArgs} args - Group by arguments.
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
      T extends ColaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ColaGroupByArgs['orderBy'] }
        : { orderBy?: ColaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ColaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetColaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cola model
   */
  readonly fields: ColaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cola.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ColaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Cola model
   */ 
  interface ColaFieldRefs {
    readonly id: FieldRef<"Cola", 'Int'>
    readonly titulo: FieldRef<"Cola", 'String'>
    readonly artista: FieldRef<"Cola", 'String'>
    readonly duracion: FieldRef<"Cola", 'Int'>
    readonly spotifyUri: FieldRef<"Cola", 'String'>
    readonly imagenUrl: FieldRef<"Cola", 'String'>
    readonly orden: FieldRef<"Cola", 'Int'>
    readonly tipo: FieldRef<"Cola", 'String'>
    readonly createdAt: FieldRef<"Cola", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Cola findUnique
   */
  export type ColaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cola
     */
    select?: ColaSelect<ExtArgs> | null
    /**
     * Filter, which Cola to fetch.
     */
    where: ColaWhereUniqueInput
  }

  /**
   * Cola findUniqueOrThrow
   */
  export type ColaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cola
     */
    select?: ColaSelect<ExtArgs> | null
    /**
     * Filter, which Cola to fetch.
     */
    where: ColaWhereUniqueInput
  }

  /**
   * Cola findFirst
   */
  export type ColaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cola
     */
    select?: ColaSelect<ExtArgs> | null
    /**
     * Filter, which Cola to fetch.
     */
    where?: ColaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colas to fetch.
     */
    orderBy?: ColaOrderByWithRelationInput | ColaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Colas.
     */
    cursor?: ColaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Colas.
     */
    distinct?: ColaScalarFieldEnum | ColaScalarFieldEnum[]
  }

  /**
   * Cola findFirstOrThrow
   */
  export type ColaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cola
     */
    select?: ColaSelect<ExtArgs> | null
    /**
     * Filter, which Cola to fetch.
     */
    where?: ColaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colas to fetch.
     */
    orderBy?: ColaOrderByWithRelationInput | ColaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Colas.
     */
    cursor?: ColaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Colas.
     */
    distinct?: ColaScalarFieldEnum | ColaScalarFieldEnum[]
  }

  /**
   * Cola findMany
   */
  export type ColaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cola
     */
    select?: ColaSelect<ExtArgs> | null
    /**
     * Filter, which Colas to fetch.
     */
    where?: ColaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colas to fetch.
     */
    orderBy?: ColaOrderByWithRelationInput | ColaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Colas.
     */
    cursor?: ColaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colas.
     */
    skip?: number
    distinct?: ColaScalarFieldEnum | ColaScalarFieldEnum[]
  }

  /**
   * Cola create
   */
  export type ColaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cola
     */
    select?: ColaSelect<ExtArgs> | null
    /**
     * The data needed to create a Cola.
     */
    data: XOR<ColaCreateInput, ColaUncheckedCreateInput>
  }

  /**
   * Cola createMany
   */
  export type ColaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Colas.
     */
    data: ColaCreateManyInput | ColaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cola createManyAndReturn
   */
  export type ColaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cola
     */
    select?: ColaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Colas.
     */
    data: ColaCreateManyInput | ColaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cola update
   */
  export type ColaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cola
     */
    select?: ColaSelect<ExtArgs> | null
    /**
     * The data needed to update a Cola.
     */
    data: XOR<ColaUpdateInput, ColaUncheckedUpdateInput>
    /**
     * Choose, which Cola to update.
     */
    where: ColaWhereUniqueInput
  }

  /**
   * Cola updateMany
   */
  export type ColaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Colas.
     */
    data: XOR<ColaUpdateManyMutationInput, ColaUncheckedUpdateManyInput>
    /**
     * Filter which Colas to update
     */
    where?: ColaWhereInput
  }

  /**
   * Cola upsert
   */
  export type ColaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cola
     */
    select?: ColaSelect<ExtArgs> | null
    /**
     * The filter to search for the Cola to update in case it exists.
     */
    where: ColaWhereUniqueInput
    /**
     * In case the Cola found by the `where` argument doesn't exist, create a new Cola with this data.
     */
    create: XOR<ColaCreateInput, ColaUncheckedCreateInput>
    /**
     * In case the Cola was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ColaUpdateInput, ColaUncheckedUpdateInput>
  }

  /**
   * Cola delete
   */
  export type ColaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cola
     */
    select?: ColaSelect<ExtArgs> | null
    /**
     * Filter which Cola to delete.
     */
    where: ColaWhereUniqueInput
  }

  /**
   * Cola deleteMany
   */
  export type ColaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Colas to delete
     */
    where?: ColaWhereInput
  }

  /**
   * Cola without action
   */
  export type ColaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cola
     */
    select?: ColaSelect<ExtArgs> | null
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
    oculta: 'oculta',
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


  export const ConfigScalarFieldEnum: {
    id: 'id',
    fichas: 'fichas',
    fichasHoy: 'fichasHoy',
    fechaHoy: 'fechaHoy'
  };

  export type ConfigScalarFieldEnum = (typeof ConfigScalarFieldEnum)[keyof typeof ConfigScalarFieldEnum]


  export const AppConfigScalarFieldEnum: {
    id: 'id',
    clave: 'clave',
    valor: 'valor'
  };

  export type AppConfigScalarFieldEnum = (typeof AppConfigScalarFieldEnum)[keyof typeof AppConfigScalarFieldEnum]


  export const PagoProcesadoScalarFieldEnum: {
    ref: 'ref',
    creadoEn: 'creadoEn'
  };

  export type PagoProcesadoScalarFieldEnum = (typeof PagoProcesadoScalarFieldEnum)[keyof typeof PagoProcesadoScalarFieldEnum]


  export const ColaScalarFieldEnum: {
    id: 'id',
    titulo: 'titulo',
    artista: 'artista',
    duracion: 'duracion',
    spotifyUri: 'spotifyUri',
    imagenUrl: 'imagenUrl',
    orden: 'orden',
    tipo: 'tipo',
    createdAt: 'createdAt'
  };

  export type ColaScalarFieldEnum = (typeof ColaScalarFieldEnum)[keyof typeof ColaScalarFieldEnum]


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
    oculta?: BoolFilter<"Playlist"> | boolean
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
    oculta?: SortOrder
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
    oculta?: BoolFilter<"Playlist"> | boolean
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
    oculta?: SortOrder
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
    oculta?: BoolWithAggregatesFilter<"Playlist"> | boolean
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

  export type ConfigWhereInput = {
    AND?: ConfigWhereInput | ConfigWhereInput[]
    OR?: ConfigWhereInput[]
    NOT?: ConfigWhereInput | ConfigWhereInput[]
    id?: IntFilter<"Config"> | number
    fichas?: IntFilter<"Config"> | number
    fichasHoy?: IntFilter<"Config"> | number
    fechaHoy?: StringFilter<"Config"> | string
  }

  export type ConfigOrderByWithRelationInput = {
    id?: SortOrder
    fichas?: SortOrder
    fichasHoy?: SortOrder
    fechaHoy?: SortOrder
  }

  export type ConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ConfigWhereInput | ConfigWhereInput[]
    OR?: ConfigWhereInput[]
    NOT?: ConfigWhereInput | ConfigWhereInput[]
    fichas?: IntFilter<"Config"> | number
    fichasHoy?: IntFilter<"Config"> | number
    fechaHoy?: StringFilter<"Config"> | string
  }, "id">

  export type ConfigOrderByWithAggregationInput = {
    id?: SortOrder
    fichas?: SortOrder
    fichasHoy?: SortOrder
    fechaHoy?: SortOrder
    _count?: ConfigCountOrderByAggregateInput
    _avg?: ConfigAvgOrderByAggregateInput
    _max?: ConfigMaxOrderByAggregateInput
    _min?: ConfigMinOrderByAggregateInput
    _sum?: ConfigSumOrderByAggregateInput
  }

  export type ConfigScalarWhereWithAggregatesInput = {
    AND?: ConfigScalarWhereWithAggregatesInput | ConfigScalarWhereWithAggregatesInput[]
    OR?: ConfigScalarWhereWithAggregatesInput[]
    NOT?: ConfigScalarWhereWithAggregatesInput | ConfigScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Config"> | number
    fichas?: IntWithAggregatesFilter<"Config"> | number
    fichasHoy?: IntWithAggregatesFilter<"Config"> | number
    fechaHoy?: StringWithAggregatesFilter<"Config"> | string
  }

  export type AppConfigWhereInput = {
    AND?: AppConfigWhereInput | AppConfigWhereInput[]
    OR?: AppConfigWhereInput[]
    NOT?: AppConfigWhereInput | AppConfigWhereInput[]
    id?: IntFilter<"AppConfig"> | number
    clave?: StringFilter<"AppConfig"> | string
    valor?: StringFilter<"AppConfig"> | string
  }

  export type AppConfigOrderByWithRelationInput = {
    id?: SortOrder
    clave?: SortOrder
    valor?: SortOrder
  }

  export type AppConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    clave?: string
    AND?: AppConfigWhereInput | AppConfigWhereInput[]
    OR?: AppConfigWhereInput[]
    NOT?: AppConfigWhereInput | AppConfigWhereInput[]
    valor?: StringFilter<"AppConfig"> | string
  }, "id" | "clave">

  export type AppConfigOrderByWithAggregationInput = {
    id?: SortOrder
    clave?: SortOrder
    valor?: SortOrder
    _count?: AppConfigCountOrderByAggregateInput
    _avg?: AppConfigAvgOrderByAggregateInput
    _max?: AppConfigMaxOrderByAggregateInput
    _min?: AppConfigMinOrderByAggregateInput
    _sum?: AppConfigSumOrderByAggregateInput
  }

  export type AppConfigScalarWhereWithAggregatesInput = {
    AND?: AppConfigScalarWhereWithAggregatesInput | AppConfigScalarWhereWithAggregatesInput[]
    OR?: AppConfigScalarWhereWithAggregatesInput[]
    NOT?: AppConfigScalarWhereWithAggregatesInput | AppConfigScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AppConfig"> | number
    clave?: StringWithAggregatesFilter<"AppConfig"> | string
    valor?: StringWithAggregatesFilter<"AppConfig"> | string
  }

  export type PagoProcesadoWhereInput = {
    AND?: PagoProcesadoWhereInput | PagoProcesadoWhereInput[]
    OR?: PagoProcesadoWhereInput[]
    NOT?: PagoProcesadoWhereInput | PagoProcesadoWhereInput[]
    ref?: StringFilter<"PagoProcesado"> | string
    creadoEn?: DateTimeFilter<"PagoProcesado"> | Date | string
  }

  export type PagoProcesadoOrderByWithRelationInput = {
    ref?: SortOrder
    creadoEn?: SortOrder
  }

  export type PagoProcesadoWhereUniqueInput = Prisma.AtLeast<{
    ref?: string
    AND?: PagoProcesadoWhereInput | PagoProcesadoWhereInput[]
    OR?: PagoProcesadoWhereInput[]
    NOT?: PagoProcesadoWhereInput | PagoProcesadoWhereInput[]
    creadoEn?: DateTimeFilter<"PagoProcesado"> | Date | string
  }, "ref">

  export type PagoProcesadoOrderByWithAggregationInput = {
    ref?: SortOrder
    creadoEn?: SortOrder
    _count?: PagoProcesadoCountOrderByAggregateInput
    _max?: PagoProcesadoMaxOrderByAggregateInput
    _min?: PagoProcesadoMinOrderByAggregateInput
  }

  export type PagoProcesadoScalarWhereWithAggregatesInput = {
    AND?: PagoProcesadoScalarWhereWithAggregatesInput | PagoProcesadoScalarWhereWithAggregatesInput[]
    OR?: PagoProcesadoScalarWhereWithAggregatesInput[]
    NOT?: PagoProcesadoScalarWhereWithAggregatesInput | PagoProcesadoScalarWhereWithAggregatesInput[]
    ref?: StringWithAggregatesFilter<"PagoProcesado"> | string
    creadoEn?: DateTimeWithAggregatesFilter<"PagoProcesado"> | Date | string
  }

  export type ColaWhereInput = {
    AND?: ColaWhereInput | ColaWhereInput[]
    OR?: ColaWhereInput[]
    NOT?: ColaWhereInput | ColaWhereInput[]
    id?: IntFilter<"Cola"> | number
    titulo?: StringFilter<"Cola"> | string
    artista?: StringFilter<"Cola"> | string
    duracion?: IntFilter<"Cola"> | number
    spotifyUri?: StringFilter<"Cola"> | string
    imagenUrl?: StringFilter<"Cola"> | string
    orden?: IntFilter<"Cola"> | number
    tipo?: StringFilter<"Cola"> | string
    createdAt?: DateTimeFilter<"Cola"> | Date | string
  }

  export type ColaOrderByWithRelationInput = {
    id?: SortOrder
    titulo?: SortOrder
    artista?: SortOrder
    duracion?: SortOrder
    spotifyUri?: SortOrder
    imagenUrl?: SortOrder
    orden?: SortOrder
    tipo?: SortOrder
    createdAt?: SortOrder
  }

  export type ColaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ColaWhereInput | ColaWhereInput[]
    OR?: ColaWhereInput[]
    NOT?: ColaWhereInput | ColaWhereInput[]
    titulo?: StringFilter<"Cola"> | string
    artista?: StringFilter<"Cola"> | string
    duracion?: IntFilter<"Cola"> | number
    spotifyUri?: StringFilter<"Cola"> | string
    imagenUrl?: StringFilter<"Cola"> | string
    orden?: IntFilter<"Cola"> | number
    tipo?: StringFilter<"Cola"> | string
    createdAt?: DateTimeFilter<"Cola"> | Date | string
  }, "id">

  export type ColaOrderByWithAggregationInput = {
    id?: SortOrder
    titulo?: SortOrder
    artista?: SortOrder
    duracion?: SortOrder
    spotifyUri?: SortOrder
    imagenUrl?: SortOrder
    orden?: SortOrder
    tipo?: SortOrder
    createdAt?: SortOrder
    _count?: ColaCountOrderByAggregateInput
    _avg?: ColaAvgOrderByAggregateInput
    _max?: ColaMaxOrderByAggregateInput
    _min?: ColaMinOrderByAggregateInput
    _sum?: ColaSumOrderByAggregateInput
  }

  export type ColaScalarWhereWithAggregatesInput = {
    AND?: ColaScalarWhereWithAggregatesInput | ColaScalarWhereWithAggregatesInput[]
    OR?: ColaScalarWhereWithAggregatesInput[]
    NOT?: ColaScalarWhereWithAggregatesInput | ColaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Cola"> | number
    titulo?: StringWithAggregatesFilter<"Cola"> | string
    artista?: StringWithAggregatesFilter<"Cola"> | string
    duracion?: IntWithAggregatesFilter<"Cola"> | number
    spotifyUri?: StringWithAggregatesFilter<"Cola"> | string
    imagenUrl?: StringWithAggregatesFilter<"Cola"> | string
    orden?: IntWithAggregatesFilter<"Cola"> | number
    tipo?: StringWithAggregatesFilter<"Cola"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Cola"> | Date | string
  }

  export type PlaylistCreateInput = {
    nombre: string
    descripcion?: string
    imagenUrl?: string
    esFavoritos?: boolean
    oculta?: boolean
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
    oculta?: boolean
    orden?: number
    createdAt?: Date | string
    canciones?: PlaylistCancionUncheckedCreateNestedManyWithoutPlaylistInput
  }

  export type PlaylistUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    imagenUrl?: StringFieldUpdateOperationsInput | string
    esFavoritos?: BoolFieldUpdateOperationsInput | boolean
    oculta?: BoolFieldUpdateOperationsInput | boolean
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
    oculta?: BoolFieldUpdateOperationsInput | boolean
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
    oculta?: boolean
    orden?: number
    createdAt?: Date | string
  }

  export type PlaylistUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    imagenUrl?: StringFieldUpdateOperationsInput | string
    esFavoritos?: BoolFieldUpdateOperationsInput | boolean
    oculta?: BoolFieldUpdateOperationsInput | boolean
    orden?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaylistUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    imagenUrl?: StringFieldUpdateOperationsInput | string
    esFavoritos?: BoolFieldUpdateOperationsInput | boolean
    oculta?: BoolFieldUpdateOperationsInput | boolean
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

  export type ConfigCreateInput = {
    id?: number
    fichas?: number
    fichasHoy?: number
    fechaHoy?: string
  }

  export type ConfigUncheckedCreateInput = {
    id?: number
    fichas?: number
    fichasHoy?: number
    fechaHoy?: string
  }

  export type ConfigUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    fichas?: IntFieldUpdateOperationsInput | number
    fichasHoy?: IntFieldUpdateOperationsInput | number
    fechaHoy?: StringFieldUpdateOperationsInput | string
  }

  export type ConfigUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    fichas?: IntFieldUpdateOperationsInput | number
    fichasHoy?: IntFieldUpdateOperationsInput | number
    fechaHoy?: StringFieldUpdateOperationsInput | string
  }

  export type ConfigCreateManyInput = {
    id?: number
    fichas?: number
    fichasHoy?: number
    fechaHoy?: string
  }

  export type ConfigUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    fichas?: IntFieldUpdateOperationsInput | number
    fichasHoy?: IntFieldUpdateOperationsInput | number
    fechaHoy?: StringFieldUpdateOperationsInput | string
  }

  export type ConfigUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    fichas?: IntFieldUpdateOperationsInput | number
    fichasHoy?: IntFieldUpdateOperationsInput | number
    fechaHoy?: StringFieldUpdateOperationsInput | string
  }

  export type AppConfigCreateInput = {
    clave: string
    valor: string
  }

  export type AppConfigUncheckedCreateInput = {
    id?: number
    clave: string
    valor: string
  }

  export type AppConfigUpdateInput = {
    clave?: StringFieldUpdateOperationsInput | string
    valor?: StringFieldUpdateOperationsInput | string
  }

  export type AppConfigUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    clave?: StringFieldUpdateOperationsInput | string
    valor?: StringFieldUpdateOperationsInput | string
  }

  export type AppConfigCreateManyInput = {
    id?: number
    clave: string
    valor: string
  }

  export type AppConfigUpdateManyMutationInput = {
    clave?: StringFieldUpdateOperationsInput | string
    valor?: StringFieldUpdateOperationsInput | string
  }

  export type AppConfigUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    clave?: StringFieldUpdateOperationsInput | string
    valor?: StringFieldUpdateOperationsInput | string
  }

  export type PagoProcesadoCreateInput = {
    ref: string
    creadoEn?: Date | string
  }

  export type PagoProcesadoUncheckedCreateInput = {
    ref: string
    creadoEn?: Date | string
  }

  export type PagoProcesadoUpdateInput = {
    ref?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagoProcesadoUncheckedUpdateInput = {
    ref?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagoProcesadoCreateManyInput = {
    ref: string
    creadoEn?: Date | string
  }

  export type PagoProcesadoUpdateManyMutationInput = {
    ref?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagoProcesadoUncheckedUpdateManyInput = {
    ref?: StringFieldUpdateOperationsInput | string
    creadoEn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColaCreateInput = {
    titulo: string
    artista: string
    duracion: number
    spotifyUri: string
    imagenUrl: string
    orden: number
    tipo?: string
    createdAt?: Date | string
  }

  export type ColaUncheckedCreateInput = {
    id?: number
    titulo: string
    artista: string
    duracion: number
    spotifyUri: string
    imagenUrl: string
    orden: number
    tipo?: string
    createdAt?: Date | string
  }

  export type ColaUpdateInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    artista?: StringFieldUpdateOperationsInput | string
    duracion?: IntFieldUpdateOperationsInput | number
    spotifyUri?: StringFieldUpdateOperationsInput | string
    imagenUrl?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    artista?: StringFieldUpdateOperationsInput | string
    duracion?: IntFieldUpdateOperationsInput | number
    spotifyUri?: StringFieldUpdateOperationsInput | string
    imagenUrl?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColaCreateManyInput = {
    id?: number
    titulo: string
    artista: string
    duracion: number
    spotifyUri: string
    imagenUrl: string
    orden: number
    tipo?: string
    createdAt?: Date | string
  }

  export type ColaUpdateManyMutationInput = {
    titulo?: StringFieldUpdateOperationsInput | string
    artista?: StringFieldUpdateOperationsInput | string
    duracion?: IntFieldUpdateOperationsInput | number
    spotifyUri?: StringFieldUpdateOperationsInput | string
    imagenUrl?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    titulo?: StringFieldUpdateOperationsInput | string
    artista?: StringFieldUpdateOperationsInput | string
    duracion?: IntFieldUpdateOperationsInput | number
    spotifyUri?: StringFieldUpdateOperationsInput | string
    imagenUrl?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    oculta?: SortOrder
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
    oculta?: SortOrder
    orden?: SortOrder
    createdAt?: SortOrder
  }

  export type PlaylistMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    imagenUrl?: SortOrder
    esFavoritos?: SortOrder
    oculta?: SortOrder
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

  export type ConfigCountOrderByAggregateInput = {
    id?: SortOrder
    fichas?: SortOrder
    fichasHoy?: SortOrder
    fechaHoy?: SortOrder
  }

  export type ConfigAvgOrderByAggregateInput = {
    id?: SortOrder
    fichas?: SortOrder
    fichasHoy?: SortOrder
  }

  export type ConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    fichas?: SortOrder
    fichasHoy?: SortOrder
    fechaHoy?: SortOrder
  }

  export type ConfigMinOrderByAggregateInput = {
    id?: SortOrder
    fichas?: SortOrder
    fichasHoy?: SortOrder
    fechaHoy?: SortOrder
  }

  export type ConfigSumOrderByAggregateInput = {
    id?: SortOrder
    fichas?: SortOrder
    fichasHoy?: SortOrder
  }

  export type AppConfigCountOrderByAggregateInput = {
    id?: SortOrder
    clave?: SortOrder
    valor?: SortOrder
  }

  export type AppConfigAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AppConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    clave?: SortOrder
    valor?: SortOrder
  }

  export type AppConfigMinOrderByAggregateInput = {
    id?: SortOrder
    clave?: SortOrder
    valor?: SortOrder
  }

  export type AppConfigSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PagoProcesadoCountOrderByAggregateInput = {
    ref?: SortOrder
    creadoEn?: SortOrder
  }

  export type PagoProcesadoMaxOrderByAggregateInput = {
    ref?: SortOrder
    creadoEn?: SortOrder
  }

  export type PagoProcesadoMinOrderByAggregateInput = {
    ref?: SortOrder
    creadoEn?: SortOrder
  }

  export type ColaCountOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    artista?: SortOrder
    duracion?: SortOrder
    spotifyUri?: SortOrder
    imagenUrl?: SortOrder
    orden?: SortOrder
    tipo?: SortOrder
    createdAt?: SortOrder
  }

  export type ColaAvgOrderByAggregateInput = {
    id?: SortOrder
    duracion?: SortOrder
    orden?: SortOrder
  }

  export type ColaMaxOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    artista?: SortOrder
    duracion?: SortOrder
    spotifyUri?: SortOrder
    imagenUrl?: SortOrder
    orden?: SortOrder
    tipo?: SortOrder
    createdAt?: SortOrder
  }

  export type ColaMinOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    artista?: SortOrder
    duracion?: SortOrder
    spotifyUri?: SortOrder
    imagenUrl?: SortOrder
    orden?: SortOrder
    tipo?: SortOrder
    createdAt?: SortOrder
  }

  export type ColaSumOrderByAggregateInput = {
    id?: SortOrder
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
    oculta?: boolean
    orden?: number
    createdAt?: Date | string
  }

  export type PlaylistUncheckedCreateWithoutCancionesInput = {
    id?: number
    nombre: string
    descripcion?: string
    imagenUrl?: string
    esFavoritos?: boolean
    oculta?: boolean
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
    oculta?: BoolFieldUpdateOperationsInput | boolean
    orden?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaylistUncheckedUpdateWithoutCancionesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    imagenUrl?: StringFieldUpdateOperationsInput | string
    esFavoritos?: BoolFieldUpdateOperationsInput | boolean
    oculta?: BoolFieldUpdateOperationsInput | boolean
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
     * @deprecated Use ConfigDefaultArgs instead
     */
    export type ConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ConfigDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AppConfigDefaultArgs instead
     */
    export type AppConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AppConfigDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PagoProcesadoDefaultArgs instead
     */
    export type PagoProcesadoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PagoProcesadoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ColaDefaultArgs instead
     */
    export type ColaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ColaDefaultArgs<ExtArgs>

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