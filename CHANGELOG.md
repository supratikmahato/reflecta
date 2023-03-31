# Changelog

## [v8.8.3](https://github.com/TechGenius7777/coffee/compare/v8.8.2...v8.8.3) (2023-03-30)

- chore: dependency upgrades and bumped pnpm version to v8.1.0 [`3ab2b92`](https://github.com/TechGenius7777/coffee/commit/3ab2b92e0e4e924a6085a4260c0f52915bb198bf)
- fix(packages): removed dev script in database and validation package in order to fix turbo dev bug [`b76772a`](https://github.com/TechGenius7777/coffee/commit/b76772a432c301bece85da8169abde8e11b73e9c)
- chore: release v8.8.3 [`94a7a28`](https://github.com/TechGenius7777/coffee/commit/94a7a28fa7df13059d80b08202e3b321fb81c6c3)
- refactor: now use typescript sdk installed in `node_modules` for the vs code language server [`931c812`](https://github.com/TechGenius7777/coffee/commit/931c812f7f57b00db3a5446ea9c2aaeb4adaf147)
- perf(client): changed deployment command back to `turbo run build` instead of `turbo run generate` [`345c1f6`](https://github.com/TechGenius7777/coffee/commit/345c1f633cb278981fc72dc9b88ce5861c800ab7)
- perf(client): disable generating shims for typescript in client [`1452792`](https://github.com/TechGenius7777/coffee/commit/14527924f3e888b6c3b20399006efc58f2250251)

## [v8.8.2](https://github.com/TechGenius7777/coffee/compare/v8.8.1...v8.8.2) (2023-03-29)

- fix(client): version is now fetched locally from the package instead of root in order to fix a bug [`f516b83`](https://github.com/TechGenius7777/coffee/commit/f516b833765ec35bad6afb4f2689dbd57459a09a)
- chore: release v8.8.2 [`094b9a2`](https://github.com/TechGenius7777/coffee/commit/094b9a202f82bae9d699a6e609bd8dea90a1ce96)

## [v8.8.1](https://github.com/TechGenius7777/coffee/compare/v8.8.0...v8.8.1) (2023-03-29)

- chore: release v8.8.1 [`f1020aa`](https://github.com/TechGenius7777/coffee/commit/f1020aa93ca9f3aa42b288458498550273149c90)
- docs(.release-it.json): changed template to keep a changelog template in .release-it.json [`d2cf346`](https://github.com/TechGenius7777/coffee/commit/d2cf346642008c38c066d7eb310157f9cc03aa6b)

## [v8.8.0](https://github.com/TechGenius7777/coffee/compare/v8.7.1...v8.8.0) (2023-03-29)

- chore: dependency upgrades and bumped pnpm version to v8 [`c573821`](https://github.com/TechGenius7777/coffee/commit/c57382183a30d8a436ccf1020675ec36d8f8a1a3)
- refactor(client): version is now fetched locally from the root package.json instead from github api [`ba555e1`](https://github.com/TechGenius7777/coffee/commit/ba555e1ddf10aa2806fdb424795e572258777d1b)
- chore: release v8.8.0 [`b410293`](https://github.com/TechGenius7777/coffee/commit/b41029360f866476e779d4622ee14275563f698c)
- docs(.release-it.json): changed the env variable name back to default [`e434ce7`](https://github.com/TechGenius7777/coffee/commit/e434ce70604c45e13c1625d324a41a16a6765d05)
- perf(client): deployments are now powered by nuxt generate instead of nuxt build [`1781203`](https://github.com/TechGenius7777/coffee/commit/178120357e1ea2caa2537bfa8e9e7e87ddd7e904)
- fix(client): fixed ssr bug in client [`efe1195`](https://github.com/TechGenius7777/coffee/commit/efe11953576e452831813dbe78fc1890098086a8)

## [v8.7.1](https://github.com/TechGenius7777/coffee/compare/v8.7.0...v8.7.1) (2023-03-28)

- chore: release v8.7.1 [`1fdd3b4`](https://github.com/TechGenius7777/coffee/commit/1fdd3b408e670c43e5086188ff44b45dc4645c1f)
- docs: simplified the github release procedure [`a1851cf`](https://github.com/TechGenius7777/coffee/commit/a1851cf8ab0d00f9cf6c504dede1ae550f11bf8c)

## [v8.7.0](https://github.com/TechGenius7777/coffee/compare/v8.6.5...v8.7.0) (2023-03-28)

- chore: release v8.7.0 [`bf7cf32`](https://github.com/TechGenius7777/coffee/commit/bf7cf3290786c44d24769eaddbbd77f36d6a9cdc)
- docs(.release-it.json): gitHub auto release notes bug fix [`b546ae6`](https://github.com/TechGenius7777/coffee/commit/b546ae6e8b60b1facbe56a434fef933a4d62346e)

## [v8.6.5](https://github.com/TechGenius7777/coffee/compare/v8.6.4...v8.6.5) (2023-03-28)

- docs(.release-it.json): fixed documentation changelog bug in .release-it.json [`48bb5ff`](https://github.com/TechGenius7777/coffee/commit/48bb5ff7ec5f8efd242a07ab7db75aec9ef59edd)
- chore: release v8.6.5 [`8d6ada0`](https://github.com/TechGenius7777/coffee/commit/8d6ada0c77fb36a21dd47b79ba821dfbb1f2e345)

## [v8.6.4](https://github.com/TechGenius7777/coffee/compare/v8.6.3...v8.6.4) (2023-03-28)

- chore: dependency upgrades [`62e1cef`](https://github.com/TechGenius7777/coffee/commit/62e1cefb11dbf457609ab2b41aa188d5f15423ae)
- docs(.release-it.json): added custom changelog property in .release-it.json [`4ff2e0c`](https://github.com/TechGenius7777/coffee/commit/4ff2e0c2a69f180f511e2774c3df8f486f6173f9)
- chore: release v8.6.4 [`3f4135a`](https://github.com/TechGenius7777/coffee/commit/3f4135ae9e63e0991dc4cde7e83806120fe66419)

## [v8.6.3](https://github.com/TechGenius7777/coffee/compare/v8.6.2...v8.6.3) (2023-03-22)

- docs(.release-it.json): added autoGenerate in .release-it.json [`d923c26`](https://github.com/TechGenius7777/coffee/commit/d923c26f8720f9f23ce05a75ded7f901da227d6e)
- chore: release v8.6.3 [`1f003b0`](https://github.com/TechGenius7777/coffee/commit/1f003b0140893514f5c7f30272d6e98bbbe73e51)

## [v8.6.2](https://github.com/TechGenius7777/coffee/compare/v8.6.1...v8.6.2) (2023-03-22)

- chore: release v8.6.2 [`8cfba95`](https://github.com/TechGenius7777/coffee/commit/8cfba956a9bce79d4ebc0a9b8233cc496473b5aa)
- docs(.release-it.json): set inline to false in .release-it.json [`c9c4b4e`](https://github.com/TechGenius7777/coffee/commit/c9c4b4eb0266d451be0c04aa25602fefec83ad62)

## [v8.6.1](https://github.com/TechGenius7777/coffee/compare/v8.6.0...v8.6.1) (2023-03-22)

- refactor(.release-it.json): changed some .release-it.json configuration [`062568d`](https://github.com/TechGenius7777/coffee/commit/062568d529137c967b241753acb1417236024025)
- chore: release v8.6.1 [`a980436`](https://github.com/TechGenius7777/coffee/commit/a98043630e4ef4d2154104d7080721de87f733e9)

## [v8.6.0](https://github.com/TechGenius7777/coffee/compare/v8.5.0...v8.6.0) (2023-03-22)

- refactor: replaced the deprecated standard-version package with release-it [`c9e831c`](https://github.com/TechGenius7777/coffee/commit/c9e831c68e460e2aac38a62b9828ea661acdff7f)
- fix: release-it bug fix which automatically ran commitizen [`cfc0a2e`](https://github.com/TechGenius7777/coffee/commit/cfc0a2e294ef40f1095e315d6d82846019307bb1)
- Release 8.6.0 [`45bc3d9`](https://github.com/TechGenius7777/coffee/commit/45bc3d9c3a5e740ad76f090e7e47a28d93e424c4)

## [v8.5.0](https://github.com/TechGenius7777/coffee/compare/v8.4...v8.5.0) (2023-03-22)

- feat: improved commits and releases workflow [`18ba5bc`](https://github.com/TechGenius7777/coffee/commit/18ba5bc5a48d3d67c539ea808fc4b3126df2c73c)
- Dependency upgrades [`cb5f658`](https://github.com/TechGenius7777/coffee/commit/cb5f6586ba3cca21e1426ca9d5a7abfc853b4956)
- Dependency upgrades [`c120493`](https://github.com/TechGenius7777/coffee/commit/c120493ec862685b9275aa3589e8e6ad333a529b)
- chore(release): 8.5.0 [`ddac4cb`](https://github.com/TechGenius7777/coffee/commit/ddac4cb616af9b5b8d5c1e0ebf1331f6f00e4363)
- tsconfig package bug fix [`71ef8b0`](https://github.com/TechGenius7777/coffee/commit/71ef8b054d94981364c8e4585a3c9113e99bf355)
- fix(package.json): fixed version not found issue with release script [`153fc8c`](https://github.com/TechGenius7777/coffee/commit/153fc8c656beb2251ea441c37767387ac7c5e375)

## [v8.4](https://github.com/TechGenius7777/coffee/compare/v8.3...v8.4) (2023-03-20)

- Featuring formatting bug fixes and much more! [`1114c67`](https://github.com/TechGenius7777/coffee/commit/1114c67da5b8736be899410c730a1e6a587acb80)
- Made passwords even stronger [`c84b8df`](https://github.com/TechGenius7777/coffee/commit/c84b8dfa404a783bb3941a61178a5e250952f106)
- Updated dependencies [`1adb6a7`](https://github.com/TechGenius7777/coffee/commit/1adb6a73031a12e9b97abbeffb78d3eff16b887b)
- Removed unnecessary property in .npmrc [`41ea337`](https://github.com/TechGenius7777/coffee/commit/41ea3370a196207891be863e35d3b61313c19bf3)

## [v8.3](https://github.com/TechGenius7777/coffee/compare/v8.2...v8.3) (2023-03-15)

- Road to pnpm! [`6be95ae`](https://github.com/TechGenius7777/coffee/commit/6be95aeb038ae0644b925693947fc5aa43152733)

## [v8.2](https://github.com/TechGenius7777/coffee/compare/v8.1...v8.2) (2023-03-14)

- Dependency upgrades [`f93eb1b`](https://github.com/TechGenius7777/coffee/commit/f93eb1bf93165c0b97e366c5fd01fb86c3836ed6)
- Added new features [`d0a88ad`](https://github.com/TechGenius7777/coffee/commit/d0a88ad02cd46d48bda47c4ad624d931d1f91077)

## [v8.1](https://github.com/TechGenius7777/coffee/compare/v8...v8.1) (2023-03-11)

- Dependency upgrades [`70e0c8b`](https://github.com/TechGenius7777/coffee/commit/70e0c8bd9e108da7dac256fbe0561904a1cb780f)
- Dependency upgrades [`b7d578d`](https://github.com/TechGenius7777/coffee/commit/b7d578d6b2c97f3e794df327eb993ff00396f492)
- Dependency upgrades! [`9950cec`](https://github.com/TechGenius7777/coffee/commit/9950cec9088edc92313b940689edba885355290d)

## [v8](https://github.com/TechGenius7777/coffee/compare/v7.1...v8) (2023-03-08)

- SEO optimisation [`7370f4a`](https://github.com/TechGenius7777/coffee/commit/7370f4a5aa419ede2c6234ebe08b138b0673c9a2)
- Bug fix trial and dependency upgrades! [`e26e84a`](https://github.com/TechGenius7777/coffee/commit/e26e84a2ed8bc1bc2ab0c3109c0694a3e24ad8a4)
- Major improvements and bug fixes! [`244af3f`](https://github.com/TechGenius7777/coffee/commit/244af3f5fefbe8aee04361b581be65d6c9c21ced)
- Client improvements and featuring new features! [`3fdfd04`](https://github.com/TechGenius7777/coffee/commit/3fdfd042b1ed6e502a7db5280be47c35e01ce295)
- Removed unnecessary client dependency [`b9e44d6`](https://github.com/TechGenius7777/coffee/commit/b9e44d6855d157d10641cb0ed093e6f8a9d82ad2)
- Performance improvement with PurgeCSS [`54202e6`](https://github.com/TechGenius7777/coffee/commit/54202e63c4ebbc609096418bed343b610bcdbc51)
- Background video optimisation [`7323920`](https://github.com/TechGenius7777/coffee/commit/7323920aecadb3608ebfef98cfd64b0c1b59805e)
- Font optimisation [`ad04441`](https://github.com/TechGenius7777/coffee/commit/ad04441cda2c0f5b5a33a622c6a1663bc60ec45a)
- Windows submit bug fix [`b713505`](https://github.com/TechGenius7777/coffee/commit/b713505dc4d0cd73c3370a1dbad83fb05a1b98d5)
- Client UI security issue fixed [`db6e1b9`](https://github.com/TechGenius7777/coffee/commit/db6e1b94df7309d6c82bca8e825322178c8b601e)
- Bug fix trial complete [`c70dad8`](https://github.com/TechGenius7777/coffee/commit/c70dad81f8f2c3ff88739eb33a1d446a9d3d4794)
- Accessibility fixes [`5c7f9e0`](https://github.com/TechGenius7777/coffee/commit/5c7f9e04c9a685c4fcb8a9c66d2907416bb2ae97)
- tsconfig bug fix [`279d9ac`](https://github.com/TechGenius7777/coffee/commit/279d9ac64c918e48bb89040f0f8a520268abc96e)

## [v7.1](https://github.com/TechGenius7777/coffee/compare/v7...v7.1) (2023-03-05)

- Dependency upgrades! [`54cf3db`](https://github.com/TechGenius7777/coffee/commit/54cf3db235963d19fe30cd95506950558f275c15)
- Major changes and improvements [`ffbd1db`](https://github.com/TechGenius7777/coffee/commit/ffbd1db695d2a17a6d9abbba5a657a34450d9ba0)
- From Joi to Zod, A revolution! [`858759c`](https://github.com/TechGenius7777/coffee/commit/858759cc29763488362e38c3be13238b28e04729)
- Migrated from bcrypt to argon2! [`23804e7`](https://github.com/TechGenius7777/coffee/commit/23804e728406f96a852cf007d3745c13c268a090)
- Dependency upgrades and added types [`aa92ab6`](https://github.com/TechGenius7777/coffee/commit/aa92ab65011439f98ae51beb30ccba7fbda10d71)
- Bug fixes [`d9b5e98`](https://github.com/TechGenius7777/coffee/commit/d9b5e98c2e087676ab1b59d12c64b9b3ae81bf6e)
- Dependency upgrades! [`302bab5`](https://github.com/TechGenius7777/coffee/commit/302bab5b9e7c7a44c193e48ebbfb24a83f2ca263)
- Dependency upgrades! [`e2fa77f`](https://github.com/TechGenius7777/coffee/commit/e2fa77f21e317c33aecc6fc43e61080ebd5b458b)
- Prisma migration bug fix [`1e8075f`](https://github.com/TechGenius7777/coffee/commit/1e8075fa9e0eb1ae06a513f97c3a4301cf276e9c)
- Dependency upgrades [`2a691c0`](https://github.com/TechGenius7777/coffee/commit/2a691c02efc2d5802c5699e1f4dba47eb50a8a16)
- Consistency fixes [`8f63a6e`](https://github.com/TechGenius7777/coffee/commit/8f63a6e212d3c5ce8a25daeb8e64666ae528fa6b)

## [v7](https://github.com/TechGenius7777/coffee/compare/v6.1...v7) (2023-02-10)

- Build performance improvements and much more [`ddca4f1`](https://github.com/TechGenius7777/coffee/commit/ddca4f1af1f478d3b4ee93664d5de3239473bd28)
- Dependency and Nuxt upgrades! [`058b05b`](https://github.com/TechGenius7777/coffee/commit/058b05bd34c561e6c75019acf1df18820a436899)
- Dependency upgrades! [`78330a8`](https://github.com/TechGenius7777/coffee/commit/78330a8450c2c628178fda97ee8753f12af7272e)
- Minor upgrades [`3cb430b`](https://github.com/TechGenius7777/coffee/commit/3cb430b0e29aa23b9f84c03e66d6fa6ced03aa8a)
- Development improvements [`06ffa9b`](https://github.com/TechGenius7777/coffee/commit/06ffa9b83ea04ffe8ffb592b383311a50880b383)
- Minor fixes [`a5b2caf`](https://github.com/TechGenius7777/coffee/commit/a5b2caf371aaacac541ff67c3b6f1a1a6e0c8ce4)
- Client build bug fix trial [`95f1672`](https://github.com/TechGenius7777/coffee/commit/95f16726405dde6b76f568d144171836e0109be0)
- Client build bug fix trial [`4674923`](https://github.com/TechGenius7777/coffee/commit/467492354e68e30a607ea80db7e4e98c40f14895)
- Client build bug fix trial [`4a3adb6`](https://github.com/TechGenius7777/coffee/commit/4a3adb64a4e80e78a4cddd20acf2a54f1719e8a1)
- All external dependency in server workspace [`d67f11f`](https://github.com/TechGenius7777/coffee/commit/d67f11f3e3dc8b036f5241c4dd18341f9ccf720b)

## [v6.1](https://github.com/TechGenius7777/coffee/compare/v6...v6.1) (2023-02-06)

- Improved formatting [`ce5d5db`](https://github.com/TechGenius7777/coffee/commit/ce5d5db4b4cebad1e8f314dee144e121cdbd58dc)
- Create README.md [`323fc8b`](https://github.com/TechGenius7777/coffee/commit/323fc8b77e2b09347b821c7af537f32e8d91bab5)

## v6 (2023-02-05)

- first commit [`4b551b7`](https://github.com/TechGenius7777/coffee/commit/4b551b7c3c00981a6cf901dda93735e92ff8e188)
- Breaking bug fix and improvements [`536334d`](https://github.com/TechGenius7777/coffee/commit/536334df96634fa371cb7f31f7d2dd244993bc00)
- Bug fix trial [`61d1b41`](https://github.com/TechGenius7777/coffee/commit/61d1b413711c2ef4aec39eeba25bc1dbc64461a0)
- Testing [`ad52b02`](https://github.com/TechGenius7777/coffee/commit/ad52b02b6234dab9d34b0919731c846e775855f9)
- Turbo hard coded version [`f6a00eb`](https://github.com/TechGenius7777/coffee/commit/f6a00eb790fd0b52ab10f9504f97f9eecf062bc2)
- Package bug fix [`a2fac83`](https://github.com/TechGenius7777/coffee/commit/a2fac83cf940586f87909148871a41124eb73f79)
- Bug fix (hope so) [`56d02ae`](https://github.com/TechGenius7777/coffee/commit/56d02ae63502e0c3b8bb7395f5cb72a78e46ce16)
- Test [`5eb61ab`](https://github.com/TechGenius7777/coffee/commit/5eb61abf2b68a4a6131a9e3f331db2a2db56d832)
- Bug fix trial [`fbb9530`](https://github.com/TechGenius7777/coffee/commit/fbb95309dd721a8e1c6410eebd313e3a175df5f5)
- Bug fix trial [`eecbb90`](https://github.com/TechGenius7777/coffee/commit/eecbb908f87a3bffa9299c73a991e0e73a18e83d)
- Bug fix try [`44702de`](https://github.com/TechGenius7777/coffee/commit/44702de0b0d79442f750a99294b3f83aaaad1ba1)
- Bug fix trial [`5f4b009`](https://github.com/TechGenius7777/coffee/commit/5f4b0091b477c73e364baf3b7a262a0c64955e34)
- Test [`8beff54`](https://github.com/TechGenius7777/coffee/commit/8beff545890c8b9f6710eb4325552a459f5ac1a3)
- Testing [`b738880`](https://github.com/TechGenius7777/coffee/commit/b73888027b07fd5a6de072abe92d76a427683d65)
