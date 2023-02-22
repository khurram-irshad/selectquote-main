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
export class SessionStorage {
    getItem(key: string) {
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : null
    }
    setItem(key: string, data: any) {
        sessionStorage.setItem(key, JSON.stringify(data))
    }
    removeItem(key: string) {
        sessionStorage.removeItem(key)
    }
    clear() {
        sessionStorage.clear()
    }
}

export const StorageService = new Storage();
export const SessionStorageService = new SessionStorage();