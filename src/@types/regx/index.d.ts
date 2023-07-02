declare module "regx" {
    function regx(flags: string): (strings: TemplateStringsArray, ...values: any[]) => RegExp;

    export = regx;
}
