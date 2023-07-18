export default abstract class Driver<DB> {
    protected client!: DB;

    abstract connect(connStr: string): Promise<DB>;
    abstract exec(sql: string, ...params: string[]): Promise<void>
    abstract query<T>(sql: string, ...params: string[]): Promise<T[]>

    async destroy(): Promise<void> {}

    constructor(protected connStr: string) {}

    async init() {
        this.client = await this.connect(this.connStr);
    }
}