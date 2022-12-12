export class Storage {
    getItem(key: string) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null
    }
    setItem(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data))
    }
    removeItem(key: string) {
        localStorage.removeItem(key)
    }
    clear() {
        localStorage.clear()
    }
}

export const StorageService = new Storage();