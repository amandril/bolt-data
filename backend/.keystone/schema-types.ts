type Scalars = {
  readonly ID: string;
  readonly Boolean: boolean;
  readonly String: string;
  readonly Int: number;
  readonly Float: number;
  readonly JSON: import('@keystone-next/types').JSONValue;
};

export type UserWhereInput = {
  readonly AND?: ReadonlyArray<UserWhereInput | null> | null;
  readonly OR?: ReadonlyArray<UserWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly name?: Scalars['String'] | null;
  readonly name_not?: Scalars['String'] | null;
  readonly name_contains?: Scalars['String'] | null;
  readonly name_not_contains?: Scalars['String'] | null;
  readonly name_starts_with?: Scalars['String'] | null;
  readonly name_not_starts_with?: Scalars['String'] | null;
  readonly name_ends_with?: Scalars['String'] | null;
  readonly name_not_ends_with?: Scalars['String'] | null;
  readonly name_i?: Scalars['String'] | null;
  readonly name_not_i?: Scalars['String'] | null;
  readonly name_contains_i?: Scalars['String'] | null;
  readonly name_not_contains_i?: Scalars['String'] | null;
  readonly name_starts_with_i?: Scalars['String'] | null;
  readonly name_not_starts_with_i?: Scalars['String'] | null;
  readonly name_ends_with_i?: Scalars['String'] | null;
  readonly name_not_ends_with_i?: Scalars['String'] | null;
  readonly name_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly name_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly email?: Scalars['String'] | null;
  readonly email_not?: Scalars['String'] | null;
  readonly email_contains?: Scalars['String'] | null;
  readonly email_not_contains?: Scalars['String'] | null;
  readonly email_starts_with?: Scalars['String'] | null;
  readonly email_not_starts_with?: Scalars['String'] | null;
  readonly email_ends_with?: Scalars['String'] | null;
  readonly email_not_ends_with?: Scalars['String'] | null;
  readonly email_i?: Scalars['String'] | null;
  readonly email_not_i?: Scalars['String'] | null;
  readonly email_contains_i?: Scalars['String'] | null;
  readonly email_not_contains_i?: Scalars['String'] | null;
  readonly email_starts_with_i?: Scalars['String'] | null;
  readonly email_not_starts_with_i?: Scalars['String'] | null;
  readonly email_ends_with_i?: Scalars['String'] | null;
  readonly email_not_ends_with_i?: Scalars['String'] | null;
  readonly email_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly email_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly password_is_set?: Scalars['Boolean'] | null;
  readonly passwordResetToken_is_set?: Scalars['Boolean'] | null;
  readonly passwordResetIssuedAt?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_not?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_lt?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_lte?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_gt?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_gte?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly passwordResetIssuedAt_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly passwordResetRedeemedAt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_not?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_lt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_lte?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_gt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_gte?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly passwordResetRedeemedAt_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly magicAuthToken_is_set?: Scalars['Boolean'] | null;
  readonly magicAuthIssuedAt?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_not?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_lt?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_lte?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_gt?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_gte?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly magicAuthIssuedAt_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly magicAuthRedeemedAt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_not?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_lt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_lte?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_gt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_gte?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly magicAuthRedeemedAt_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
};

export type UserWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortUsersBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'email_ASC'
  | 'email_DESC'
  | 'passwordResetIssuedAt_ASC'
  | 'passwordResetIssuedAt_DESC'
  | 'passwordResetRedeemedAt_ASC'
  | 'passwordResetRedeemedAt_DESC'
  | 'magicAuthIssuedAt_ASC'
  | 'magicAuthIssuedAt_DESC'
  | 'magicAuthRedeemedAt_ASC'
  | 'magicAuthRedeemedAt_DESC';

export type UserUpdateInput = {
  readonly name?: Scalars['String'] | null;
  readonly email?: Scalars['String'] | null;
  readonly password?: Scalars['String'] | null;
  readonly passwordResetToken?: Scalars['String'] | null;
  readonly passwordResetIssuedAt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt?: Scalars['String'] | null;
  readonly magicAuthToken?: Scalars['String'] | null;
  readonly magicAuthIssuedAt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt?: Scalars['String'] | null;
};

export type UsersUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: UserUpdateInput | null;
};

export type UserCreateInput = {
  readonly name?: Scalars['String'] | null;
  readonly email?: Scalars['String'] | null;
  readonly password?: Scalars['String'] | null;
  readonly passwordResetToken?: Scalars['String'] | null;
  readonly passwordResetIssuedAt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt?: Scalars['String'] | null;
  readonly magicAuthToken?: Scalars['String'] | null;
  readonly magicAuthIssuedAt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt?: Scalars['String'] | null;
};

export type UsersCreateInput = {
  readonly data?: UserCreateInput | null;
};

export type BoltRelateToManyInput = {
  readonly create?: ReadonlyArray<BoltCreateInput | null> | null;
  readonly connect?: ReadonlyArray<BoltWhereUniqueInput | null> | null;
  readonly disconnect?: ReadonlyArray<BoltWhereUniqueInput | null> | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type RouteWhereInput = {
  readonly AND?: ReadonlyArray<RouteWhereInput | null> | null;
  readonly OR?: ReadonlyArray<RouteWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly name?: Scalars['String'] | null;
  readonly name_not?: Scalars['String'] | null;
  readonly name_contains?: Scalars['String'] | null;
  readonly name_not_contains?: Scalars['String'] | null;
  readonly name_starts_with?: Scalars['String'] | null;
  readonly name_not_starts_with?: Scalars['String'] | null;
  readonly name_ends_with?: Scalars['String'] | null;
  readonly name_not_ends_with?: Scalars['String'] | null;
  readonly name_i?: Scalars['String'] | null;
  readonly name_not_i?: Scalars['String'] | null;
  readonly name_contains_i?: Scalars['String'] | null;
  readonly name_not_contains_i?: Scalars['String'] | null;
  readonly name_starts_with_i?: Scalars['String'] | null;
  readonly name_not_starts_with_i?: Scalars['String'] | null;
  readonly name_ends_with_i?: Scalars['String'] | null;
  readonly name_not_ends_with_i?: Scalars['String'] | null;
  readonly name_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly name_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly geolocation?: Scalars['String'] | null;
  readonly geolocation_not?: Scalars['String'] | null;
  readonly geolocation_contains?: Scalars['String'] | null;
  readonly geolocation_not_contains?: Scalars['String'] | null;
  readonly geolocation_starts_with?: Scalars['String'] | null;
  readonly geolocation_not_starts_with?: Scalars['String'] | null;
  readonly geolocation_ends_with?: Scalars['String'] | null;
  readonly geolocation_not_ends_with?: Scalars['String'] | null;
  readonly geolocation_i?: Scalars['String'] | null;
  readonly geolocation_not_i?: Scalars['String'] | null;
  readonly geolocation_contains_i?: Scalars['String'] | null;
  readonly geolocation_not_contains_i?: Scalars['String'] | null;
  readonly geolocation_starts_with_i?: Scalars['String'] | null;
  readonly geolocation_not_starts_with_i?: Scalars['String'] | null;
  readonly geolocation_ends_with_i?: Scalars['String'] | null;
  readonly geolocation_not_ends_with_i?: Scalars['String'] | null;
  readonly geolocation_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly geolocation_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly parent_sector?: Scalars['String'] | null;
  readonly parent_sector_not?: Scalars['String'] | null;
  readonly parent_sector_contains?: Scalars['String'] | null;
  readonly parent_sector_not_contains?: Scalars['String'] | null;
  readonly parent_sector_starts_with?: Scalars['String'] | null;
  readonly parent_sector_not_starts_with?: Scalars['String'] | null;
  readonly parent_sector_ends_with?: Scalars['String'] | null;
  readonly parent_sector_not_ends_with?: Scalars['String'] | null;
  readonly parent_sector_i?: Scalars['String'] | null;
  readonly parent_sector_not_i?: Scalars['String'] | null;
  readonly parent_sector_contains_i?: Scalars['String'] | null;
  readonly parent_sector_not_contains_i?: Scalars['String'] | null;
  readonly parent_sector_starts_with_i?: Scalars['String'] | null;
  readonly parent_sector_not_starts_with_i?: Scalars['String'] | null;
  readonly parent_sector_ends_with_i?: Scalars['String'] | null;
  readonly parent_sector_not_ends_with_i?: Scalars['String'] | null;
  readonly parent_sector_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly parent_sector_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly bolts_every?: BoltWhereInput | null;
  readonly bolts_some?: BoltWhereInput | null;
  readonly bolts_none?: BoltWhereInput | null;
  readonly mp_route_id?: Scalars['String'] | null;
  readonly mp_route_id_not?: Scalars['String'] | null;
  readonly mp_route_id_contains?: Scalars['String'] | null;
  readonly mp_route_id_not_contains?: Scalars['String'] | null;
  readonly mp_route_id_starts_with?: Scalars['String'] | null;
  readonly mp_route_id_not_starts_with?: Scalars['String'] | null;
  readonly mp_route_id_ends_with?: Scalars['String'] | null;
  readonly mp_route_id_not_ends_with?: Scalars['String'] | null;
  readonly mp_route_id_i?: Scalars['String'] | null;
  readonly mp_route_id_not_i?: Scalars['String'] | null;
  readonly mp_route_id_contains_i?: Scalars['String'] | null;
  readonly mp_route_id_not_contains_i?: Scalars['String'] | null;
  readonly mp_route_id_starts_with_i?: Scalars['String'] | null;
  readonly mp_route_id_not_starts_with_i?: Scalars['String'] | null;
  readonly mp_route_id_ends_with_i?: Scalars['String'] | null;
  readonly mp_route_id_not_ends_with_i?: Scalars['String'] | null;
  readonly mp_route_id_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly mp_route_id_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly mp_sector_id?: Scalars['String'] | null;
  readonly mp_sector_id_not?: Scalars['String'] | null;
  readonly mp_sector_id_contains?: Scalars['String'] | null;
  readonly mp_sector_id_not_contains?: Scalars['String'] | null;
  readonly mp_sector_id_starts_with?: Scalars['String'] | null;
  readonly mp_sector_id_not_starts_with?: Scalars['String'] | null;
  readonly mp_sector_id_ends_with?: Scalars['String'] | null;
  readonly mp_sector_id_not_ends_with?: Scalars['String'] | null;
  readonly mp_sector_id_i?: Scalars['String'] | null;
  readonly mp_sector_id_not_i?: Scalars['String'] | null;
  readonly mp_sector_id_contains_i?: Scalars['String'] | null;
  readonly mp_sector_id_not_contains_i?: Scalars['String'] | null;
  readonly mp_sector_id_starts_with_i?: Scalars['String'] | null;
  readonly mp_sector_id_not_starts_with_i?: Scalars['String'] | null;
  readonly mp_sector_id_ends_with_i?: Scalars['String'] | null;
  readonly mp_sector_id_not_ends_with_i?: Scalars['String'] | null;
  readonly mp_sector_id_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly mp_sector_id_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
};

export type RouteWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortRoutesBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'geolocation_ASC'
  | 'geolocation_DESC'
  | 'parent_sector_ASC'
  | 'parent_sector_DESC'
  | 'bolts_ASC'
  | 'bolts_DESC'
  | 'mp_route_id_ASC'
  | 'mp_route_id_DESC'
  | 'mp_sector_id_ASC'
  | 'mp_sector_id_DESC';

export type RouteUpdateInput = {
  readonly name?: Scalars['String'] | null;
  readonly geolocation?: Scalars['String'] | null;
  readonly parent_sector?: Scalars['String'] | null;
  readonly bolts?: BoltRelateToManyInput | null;
  readonly mp_route_id?: Scalars['String'] | null;
  readonly mp_sector_id?: Scalars['String'] | null;
};

export type RoutesUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: RouteUpdateInput | null;
};

export type RouteCreateInput = {
  readonly name?: Scalars['String'] | null;
  readonly geolocation?: Scalars['String'] | null;
  readonly parent_sector?: Scalars['String'] | null;
  readonly bolts?: BoltRelateToManyInput | null;
  readonly mp_route_id?: Scalars['String'] | null;
  readonly mp_sector_id?: Scalars['String'] | null;
};

export type RoutesCreateInput = {
  readonly data?: RouteCreateInput | null;
};

export type AreaWhereInput = {
  readonly AND?: ReadonlyArray<AreaWhereInput | null> | null;
  readonly OR?: ReadonlyArray<AreaWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly name?: Scalars['String'] | null;
  readonly name_not?: Scalars['String'] | null;
  readonly name_contains?: Scalars['String'] | null;
  readonly name_not_contains?: Scalars['String'] | null;
  readonly name_starts_with?: Scalars['String'] | null;
  readonly name_not_starts_with?: Scalars['String'] | null;
  readonly name_ends_with?: Scalars['String'] | null;
  readonly name_not_ends_with?: Scalars['String'] | null;
  readonly name_i?: Scalars['String'] | null;
  readonly name_not_i?: Scalars['String'] | null;
  readonly name_contains_i?: Scalars['String'] | null;
  readonly name_not_contains_i?: Scalars['String'] | null;
  readonly name_starts_with_i?: Scalars['String'] | null;
  readonly name_not_starts_with_i?: Scalars['String'] | null;
  readonly name_ends_with_i?: Scalars['String'] | null;
  readonly name_not_ends_with_i?: Scalars['String'] | null;
  readonly name_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly name_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly usState?: Scalars['String'] | null;
  readonly usState_not?: Scalars['String'] | null;
  readonly usState_contains?: Scalars['String'] | null;
  readonly usState_not_contains?: Scalars['String'] | null;
  readonly usState_starts_with?: Scalars['String'] | null;
  readonly usState_not_starts_with?: Scalars['String'] | null;
  readonly usState_ends_with?: Scalars['String'] | null;
  readonly usState_not_ends_with?: Scalars['String'] | null;
  readonly usState_i?: Scalars['String'] | null;
  readonly usState_not_i?: Scalars['String'] | null;
  readonly usState_contains_i?: Scalars['String'] | null;
  readonly usState_not_contains_i?: Scalars['String'] | null;
  readonly usState_starts_with_i?: Scalars['String'] | null;
  readonly usState_not_starts_with_i?: Scalars['String'] | null;
  readonly usState_ends_with_i?: Scalars['String'] | null;
  readonly usState_not_ends_with_i?: Scalars['String'] | null;
  readonly usState_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly usState_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly geolocation?: Scalars['String'] | null;
  readonly geolocation_not?: Scalars['String'] | null;
  readonly geolocation_contains?: Scalars['String'] | null;
  readonly geolocation_not_contains?: Scalars['String'] | null;
  readonly geolocation_starts_with?: Scalars['String'] | null;
  readonly geolocation_not_starts_with?: Scalars['String'] | null;
  readonly geolocation_ends_with?: Scalars['String'] | null;
  readonly geolocation_not_ends_with?: Scalars['String'] | null;
  readonly geolocation_i?: Scalars['String'] | null;
  readonly geolocation_not_i?: Scalars['String'] | null;
  readonly geolocation_contains_i?: Scalars['String'] | null;
  readonly geolocation_not_contains_i?: Scalars['String'] | null;
  readonly geolocation_starts_with_i?: Scalars['String'] | null;
  readonly geolocation_not_starts_with_i?: Scalars['String'] | null;
  readonly geolocation_ends_with_i?: Scalars['String'] | null;
  readonly geolocation_not_ends_with_i?: Scalars['String'] | null;
  readonly geolocation_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly geolocation_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
};

export type AreaWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortAreasBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'usState_ASC'
  | 'usState_DESC'
  | 'geolocation_ASC'
  | 'geolocation_DESC';

export type AreaUpdateInput = {
  readonly name?: Scalars['String'] | null;
  readonly usState?: Scalars['String'] | null;
  readonly geolocation?: Scalars['String'] | null;
};

export type AreasUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: AreaUpdateInput | null;
};

export type AreaCreateInput = {
  readonly name?: Scalars['String'] | null;
  readonly usState?: Scalars['String'] | null;
  readonly geolocation?: Scalars['String'] | null;
};

export type AreasCreateInput = {
  readonly data?: AreaCreateInput | null;
};

export type RouteRelateToOneInput = {
  readonly create?: RouteCreateInput | null;
  readonly connect?: RouteWhereUniqueInput | null;
  readonly disconnect?: RouteWhereUniqueInput | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type BoltWhereInput = {
  readonly AND?: ReadonlyArray<BoltWhereInput | null> | null;
  readonly OR?: ReadonlyArray<BoltWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly route?: RouteWhereInput | null;
  readonly route_is_null?: Scalars['Boolean'] | null;
  readonly pitch?: Scalars['Int'] | null;
  readonly pitch_not?: Scalars['Int'] | null;
  readonly pitch_lt?: Scalars['Int'] | null;
  readonly pitch_lte?: Scalars['Int'] | null;
  readonly pitch_gt?: Scalars['Int'] | null;
  readonly pitch_gte?: Scalars['Int'] | null;
  readonly pitch_in?: ReadonlyArray<Scalars['Int'] | null> | null;
  readonly pitch_not_in?: ReadonlyArray<Scalars['Int'] | null> | null;
  readonly use?: Scalars['String'] | null;
  readonly use_not?: Scalars['String'] | null;
  readonly use_contains?: Scalars['String'] | null;
  readonly use_not_contains?: Scalars['String'] | null;
  readonly use_starts_with?: Scalars['String'] | null;
  readonly use_not_starts_with?: Scalars['String'] | null;
  readonly use_ends_with?: Scalars['String'] | null;
  readonly use_not_ends_with?: Scalars['String'] | null;
  readonly use_i?: Scalars['String'] | null;
  readonly use_not_i?: Scalars['String'] | null;
  readonly use_contains_i?: Scalars['String'] | null;
  readonly use_not_contains_i?: Scalars['String'] | null;
  readonly use_starts_with_i?: Scalars['String'] | null;
  readonly use_not_starts_with_i?: Scalars['String'] | null;
  readonly use_ends_with_i?: Scalars['String'] | null;
  readonly use_not_ends_with_i?: Scalars['String'] | null;
  readonly use_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly use_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly position?: Scalars['Int'] | null;
  readonly position_not?: Scalars['Int'] | null;
  readonly position_lt?: Scalars['Int'] | null;
  readonly position_lte?: Scalars['Int'] | null;
  readonly position_gt?: Scalars['Int'] | null;
  readonly position_gte?: Scalars['Int'] | null;
  readonly position_in?: ReadonlyArray<Scalars['Int'] | null> | null;
  readonly position_not_in?: ReadonlyArray<Scalars['Int'] | null> | null;
  readonly type?: Scalars['String'] | null;
  readonly type_not?: Scalars['String'] | null;
  readonly type_contains?: Scalars['String'] | null;
  readonly type_not_contains?: Scalars['String'] | null;
  readonly type_starts_with?: Scalars['String'] | null;
  readonly type_not_starts_with?: Scalars['String'] | null;
  readonly type_ends_with?: Scalars['String'] | null;
  readonly type_not_ends_with?: Scalars['String'] | null;
  readonly type_i?: Scalars['String'] | null;
  readonly type_not_i?: Scalars['String'] | null;
  readonly type_contains_i?: Scalars['String'] | null;
  readonly type_not_contains_i?: Scalars['String'] | null;
  readonly type_starts_with_i?: Scalars['String'] | null;
  readonly type_not_starts_with_i?: Scalars['String'] | null;
  readonly type_ends_with_i?: Scalars['String'] | null;
  readonly type_not_ends_with_i?: Scalars['String'] | null;
  readonly type_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly type_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly description?: Scalars['String'] | null;
  readonly description_not?: Scalars['String'] | null;
  readonly description_contains?: Scalars['String'] | null;
  readonly description_not_contains?: Scalars['String'] | null;
  readonly description_starts_with?: Scalars['String'] | null;
  readonly description_not_starts_with?: Scalars['String'] | null;
  readonly description_ends_with?: Scalars['String'] | null;
  readonly description_not_ends_with?: Scalars['String'] | null;
  readonly description_i?: Scalars['String'] | null;
  readonly description_not_i?: Scalars['String'] | null;
  readonly description_contains_i?: Scalars['String'] | null;
  readonly description_not_contains_i?: Scalars['String'] | null;
  readonly description_starts_with_i?: Scalars['String'] | null;
  readonly description_not_starts_with_i?: Scalars['String'] | null;
  readonly description_ends_with_i?: Scalars['String'] | null;
  readonly description_not_ends_with_i?: Scalars['String'] | null;
  readonly description_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly description_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly condition?: Scalars['String'] | null;
  readonly condition_not?: Scalars['String'] | null;
  readonly condition_contains?: Scalars['String'] | null;
  readonly condition_not_contains?: Scalars['String'] | null;
  readonly condition_starts_with?: Scalars['String'] | null;
  readonly condition_not_starts_with?: Scalars['String'] | null;
  readonly condition_ends_with?: Scalars['String'] | null;
  readonly condition_not_ends_with?: Scalars['String'] | null;
  readonly condition_i?: Scalars['String'] | null;
  readonly condition_not_i?: Scalars['String'] | null;
  readonly condition_contains_i?: Scalars['String'] | null;
  readonly condition_not_contains_i?: Scalars['String'] | null;
  readonly condition_starts_with_i?: Scalars['String'] | null;
  readonly condition_not_starts_with_i?: Scalars['String'] | null;
  readonly condition_ends_with_i?: Scalars['String'] | null;
  readonly condition_not_ends_with_i?: Scalars['String'] | null;
  readonly condition_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly condition_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly installDate?: Scalars['String'] | null;
  readonly installDate_not?: Scalars['String'] | null;
  readonly installDate_contains?: Scalars['String'] | null;
  readonly installDate_not_contains?: Scalars['String'] | null;
  readonly installDate_starts_with?: Scalars['String'] | null;
  readonly installDate_not_starts_with?: Scalars['String'] | null;
  readonly installDate_ends_with?: Scalars['String'] | null;
  readonly installDate_not_ends_with?: Scalars['String'] | null;
  readonly installDate_i?: Scalars['String'] | null;
  readonly installDate_not_i?: Scalars['String'] | null;
  readonly installDate_contains_i?: Scalars['String'] | null;
  readonly installDate_not_contains_i?: Scalars['String'] | null;
  readonly installDate_starts_with_i?: Scalars['String'] | null;
  readonly installDate_not_starts_with_i?: Scalars['String'] | null;
  readonly installDate_ends_with_i?: Scalars['String'] | null;
  readonly installDate_not_ends_with_i?: Scalars['String'] | null;
  readonly installDate_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly installDate_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly lastUpdated?: Scalars['String'] | null;
  readonly lastUpdated_not?: Scalars['String'] | null;
  readonly lastUpdated_contains?: Scalars['String'] | null;
  readonly lastUpdated_not_contains?: Scalars['String'] | null;
  readonly lastUpdated_starts_with?: Scalars['String'] | null;
  readonly lastUpdated_not_starts_with?: Scalars['String'] | null;
  readonly lastUpdated_ends_with?: Scalars['String'] | null;
  readonly lastUpdated_not_ends_with?: Scalars['String'] | null;
  readonly lastUpdated_i?: Scalars['String'] | null;
  readonly lastUpdated_not_i?: Scalars['String'] | null;
  readonly lastUpdated_contains_i?: Scalars['String'] | null;
  readonly lastUpdated_not_contains_i?: Scalars['String'] | null;
  readonly lastUpdated_starts_with_i?: Scalars['String'] | null;
  readonly lastUpdated_not_starts_with_i?: Scalars['String'] | null;
  readonly lastUpdated_ends_with_i?: Scalars['String'] | null;
  readonly lastUpdated_not_ends_with_i?: Scalars['String'] | null;
  readonly lastUpdated_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly lastUpdated_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
};

export type BoltWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortBoltsBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'route_ASC'
  | 'route_DESC'
  | 'pitch_ASC'
  | 'pitch_DESC'
  | 'use_ASC'
  | 'use_DESC'
  | 'position_ASC'
  | 'position_DESC'
  | 'type_ASC'
  | 'type_DESC'
  | 'description_ASC'
  | 'description_DESC'
  | 'condition_ASC'
  | 'condition_DESC'
  | 'installDate_ASC'
  | 'installDate_DESC'
  | 'lastUpdated_ASC'
  | 'lastUpdated_DESC';

export type BoltUpdateInput = {
  readonly route?: RouteRelateToOneInput | null;
  readonly pitch?: Scalars['Int'] | null;
  readonly use?: Scalars['String'] | null;
  readonly position?: Scalars['Int'] | null;
  readonly type?: Scalars['String'] | null;
  readonly description?: Scalars['String'] | null;
  readonly condition?: Scalars['String'] | null;
  readonly installDate?: Scalars['String'] | null;
  readonly lastUpdated?: Scalars['String'] | null;
};

export type BoltsUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: BoltUpdateInput | null;
};

export type BoltCreateInput = {
  readonly route?: RouteRelateToOneInput | null;
  readonly pitch?: Scalars['Int'] | null;
  readonly use?: Scalars['String'] | null;
  readonly position?: Scalars['Int'] | null;
  readonly type?: Scalars['String'] | null;
  readonly description?: Scalars['String'] | null;
  readonly condition?: Scalars['String'] | null;
  readonly installDate?: Scalars['String'] | null;
  readonly lastUpdated?: Scalars['String'] | null;
};

export type BoltsCreateInput = {
  readonly data?: BoltCreateInput | null;
};

export type _ksListsMetaInput = {
  readonly key?: Scalars['String'] | null;
  readonly auxiliary?: Scalars['Boolean'] | null;
};

export type _ListSchemaFieldsInput = {
  readonly type?: Scalars['String'] | null;
};

export type PasswordAuthErrorCode =
  | 'FAILURE'
  | 'IDENTITY_NOT_FOUND'
  | 'SECRET_NOT_SET'
  | 'MULTIPLE_IDENTITY_MATCHES'
  | 'SECRET_MISMATCH';

export type CreateInitialUserInput = {
  readonly name?: Scalars['String'] | null;
  readonly email?: Scalars['String'] | null;
  readonly password?: Scalars['String'] | null;
};

export type KeystoneAdminUIFieldMetaCreateViewFieldMode = 'edit' | 'hidden';

export type KeystoneAdminUIFieldMetaListViewFieldMode = 'read' | 'hidden';

export type KeystoneAdminUIFieldMetaItemViewFieldMode =
  | 'edit'
  | 'read'
  | 'hidden';

export type KeystoneAdminUISortDirection = 'ASC' | 'DESC';

export type UserListTypeInfo = {
  key: 'User';
  fields:
    | 'id'
    | 'name'
    | 'email'
    | 'password'
    | 'passwordResetToken'
    | 'passwordResetIssuedAt'
    | 'passwordResetRedeemedAt'
    | 'magicAuthToken'
    | 'magicAuthIssuedAt'
    | 'magicAuthRedeemedAt';
  backing: {
    readonly id: string;
    readonly name?: string | null;
    readonly email?: string | null;
    readonly password?: string | null;
    readonly passwordResetToken?: string | null;
    readonly passwordResetIssuedAt?: Date | null;
    readonly passwordResetRedeemedAt?: Date | null;
    readonly magicAuthToken?: string | null;
    readonly magicAuthIssuedAt?: Date | null;
    readonly magicAuthRedeemedAt?: Date | null;
  };
  inputs: {
    where: UserWhereInput;
    create: UserCreateInput;
    update: UserUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: UserWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortUsersBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type UserListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    UserListTypeInfo,
    UserListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  UserListTypeInfo,
  UserListTypeInfo['fields']
>;

export type RouteListTypeInfo = {
  key: 'Route';
  fields:
    | 'id'
    | 'name'
    | 'geolocation'
    | 'parent_sector'
    | 'bolts'
    | 'mp_route_id'
    | 'mp_sector_id';
  backing: {
    readonly id: string;
    readonly name?: string | null;
    readonly geolocation?: string | null;
    readonly parent_sector?: string | null;
    readonly bolts?: string | null;
    readonly mp_route_id?: string | null;
    readonly mp_sector_id?: string | null;
  };
  inputs: {
    where: RouteWhereInput;
    create: RouteCreateInput;
    update: RouteUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: RouteWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortRoutesBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type RouteListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    RouteListTypeInfo,
    RouteListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  RouteListTypeInfo,
  RouteListTypeInfo['fields']
>;

export type AreaListTypeInfo = {
  key: 'Area';
  fields: 'id' | 'name' | 'usState' | 'geolocation';
  backing: {
    readonly id: string;
    readonly name?: string | null;
    readonly usState?: string | null;
    readonly geolocation?: string | null;
  };
  inputs: {
    where: AreaWhereInput;
    create: AreaCreateInput;
    update: AreaUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: AreaWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortAreasBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type AreaListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    AreaListTypeInfo,
    AreaListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  AreaListTypeInfo,
  AreaListTypeInfo['fields']
>;

export type BoltListTypeInfo = {
  key: 'Bolt';
  fields:
    | 'id'
    | 'route'
    | 'pitch'
    | 'use'
    | 'position'
    | 'type'
    | 'description'
    | 'condition'
    | 'installDate'
    | 'lastUpdated';
  backing: {
    readonly id: string;
    readonly route?: string | null;
    readonly pitch?: number | null;
    readonly use?: string | null;
    readonly position?: number | null;
    readonly type?: string | null;
    readonly description?: string | null;
    readonly condition?: string | null;
    readonly installDate?: string | null;
    readonly lastUpdated?: string | null;
  };
  inputs: {
    where: BoltWhereInput;
    create: BoltCreateInput;
    update: BoltUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: BoltWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortBoltsBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type BoltListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    BoltListTypeInfo,
    BoltListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  BoltListTypeInfo,
  BoltListTypeInfo['fields']
>;

export type KeystoneListsTypeInfo = {
  readonly User: UserListTypeInfo;
  readonly Route: RouteListTypeInfo;
  readonly Area: AreaListTypeInfo;
  readonly Bolt: BoltListTypeInfo;
};
