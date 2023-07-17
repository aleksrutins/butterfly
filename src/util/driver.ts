export default abstract class Driver<DB> {
    protected client: DB;

    abstract connect(connStr: string): DB;
    abstract exec(sql: string, ...params: string[]): Promise<void>
    abstract query<T>(sql: string, ...params: string[]): Promise<T[]>

    constructor(protected connStr: string) {
        this.client = this.connect(connStr);
    }
}