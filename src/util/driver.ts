export default abstract class Driver<DB, TQueryResult = any> {
    protected client!: DB;

    abstract connect(connStr: string): Promise<DB>;
    abstract exec(sql: string, params: any[]): Promise<void>
    abstract query<T extends TQueryResult>(sql: string, params: any[]): Promise<T[]>

    abstract parseQueryTemplate(strings: TemplateStringsArray, ...params: any[]): [string, any[]];

    async destroy(): Promise<void> {}

    constructor(protected connStr: string) {}

    async init() {
        this.client = await this.connect(this.connStr);
    }

    q<T extends TQueryResult>(strings: TemplateStringsArray, ...params: any[]): Promise<T[]> {
        return this.query<T>(...this.parseQueryTemplate(strings, ...params));
    }

    e(strings: TemplateStringsArray, ...params: any[]): Promise<void> {
        return this.exec(...this.parseQueryTemplate(strings, ...params));
    }
}