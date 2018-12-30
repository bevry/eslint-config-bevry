# History

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
