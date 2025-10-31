export class LocalStorage {
    public static get<T>(key: string): T | null {
        try {
            const item = localStorage.getItem(key);
            if (!item) throw new Error("Item not found");
            return JSON.parse(item) as T;
        } catch (e) {
            console.error("Ошибка взаимодействия с хранилищем: ", e);
            return null;
        }
    }

    public static set(key: string, value: unknown ): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}