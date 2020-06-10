# History

## v3.9.0 2020 June 10

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v3.8.0 2020 June 10

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v3.7.0 2020 May 22

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v3.6.0 2020 May 21

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v3.5.0 2020 May 13

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v3.4.0 2020 May 4

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v3.3.0 2020 April 28

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v3.2.0 2020 April 27

-   Set `worker` env if any of these keywords are present: `worker`, `webworker`, `workers`, `webworkers`

## v3.1.0 2020 April 21

-   Added support for [Base UI](https://baseweb.design/getting-started/setup/)

## v3.0.0 2020 March 26

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)
-   Minimum required node version changed from `node: >=8` to `node: >=10` to keep up with mandatory ecosystem changes

## v2.3.0 2019 December 9

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v2.2.0 2019 December 1

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v2.1.0 2019 December 1

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v2.0.0 2019 December 1

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)
-   Minimum required node version changed from `node: >=6` to `node: >=8` to keep up with mandatory ecosystem changes

## v1.3.0 2019 November 18

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v1.2.1 2019 May 13

-   Change engines to be `>=6`
-   Update dependencies

## v1.2.0 2019 January 26

-   Swap out support for the deprecated typescript eslint packages with the new packages that they recommend
    -   `typescript-eslint-parser` to `@typescript-eslint/parser`
    -   `eslint-plugin-typescript` to `@typescript-eslint/eslint-plugin`

## v1.1.2 2019 January 2

-   Fixed dependencies that are github references preventing dependency detection from functioning correctly

## v1.1.1 2019 January 1

-   Fixed `Parsing error: Invalid ecmaVersion` by defaulting `ecmaVersion` to `2019` instead of the dynamic next year, which is now `2020`

## v1.1.0 2018 December 31

Adapter changes:

-   TypeScript source type is no longer enforced to `module`, it is now detected based on the edition tags
-   Better detection of React and FlowType projects
-   Add support for React Hooks
-   Set the needed React plugin version configuration, based on the react version from your dependencies

Rule changes:

-   Change `spaced-comment` rule to support TypeScript `///` directives

## v1.0.2 2018 November 22

-   Included file extension in `package.json:main`

## v1.0.1 2018 November 22

-   Updated description

## v1.0.0 2018 November 22

-   Abstracted out from [bevry/base](https://github.com/bevry/base)
-   Added prettier integration
