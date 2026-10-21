import { CSSProperties } from "react";
import { TranslationKeysType } from "localization/types.ts";

import { IdentifierWithSubtypeType } from "../types";

type TagTranslationKeysType<
  Type extends string,
  Subtype extends string,
> = Subtype extends any
  ? Extract<TranslationKeysType, `tag.${Type}.${Subtype}.${string}`>
  : never;

type TagType<
  Identifier extends string,
  Type extends string,
  Subtype extends string,
> = {
  identifier: IdentifierWithSubtypeType<Identifier, Type, Subtype>;
  name: TagTranslationKeysType<Type, Subtype>;
  description: TagTranslationKeysType<Type, Subtype>;
  style: CSSProperties;
};

export type TagDataType<Type extends string, Subtype extends string> = TagType<
  "tag",
  Type,
  Subtype
>;
