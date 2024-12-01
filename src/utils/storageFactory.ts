// Define type for storage methods
type StorageMethods = {
    getItem: (name: string) => string | null;
    setItem: (name: string, value: string) => void;
    removeItem: (name: string) => void;
    clear: () => void;
    key: (index: number) => string | null;
    length: number;
};

// Storage factory function
const storageFactory = (getStorage: () => Storage): StorageMethods => {
    let inMemoryStorage: Record<string, string> = {};

    // Check if storage is supported
    function isSupported(): boolean {
        try {
            const testKey = "__some_random_key_you_are_not_going_to_use__";
            const storage = getStorage();
            storage.setItem(testKey, testKey);
            storage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Clear storage
    function clear(): void {
        if (isSupported()) {
            getStorage().clear();
        } else {
            inMemoryStorage = {};
        }
    }

    // Get item from storage
    function getItem(name: string): string | null {
        if (isSupported()) {
            return getStorage().getItem(name);
        }
        if (inMemoryStorage.hasOwnProperty(name)) {
            return inMemoryStorage[name];
        }
        return null;
    }

    // Get key at the specified index
    function key(index: number): string | null {
        if (isSupported()) {
            return getStorage().key(index);
        } else {
            return Object.keys(inMemoryStorage)[index] || null;
        }
    }

    // Remove item from storage
    function removeItem(name: string): void {
        if (isSupported()) {
            getStorage().removeItem(name);
        } else {
            delete inMemoryStorage[name];
        }
    }

    // Set item in storage
    function setItem(name: string, value: string): void {
        if (isSupported()) {
            getStorage().setItem(name, value);
        } else {
            inMemoryStorage[name] = String(value);
        }
    }

    // Get storage length
    function length(): number {
        if (isSupported()) {
            return getStorage().length;
        } else {
            return Object.keys(inMemoryStorage).length;
        }
    }

    return {
        getItem,
        setItem,
        removeItem,
        clear,
        key,
        get length() {
            return length();
        },
    };
};

// Export storage instances
export const localStore = storageFactory(() => localStorage);
export const sessionStore = storageFactory(() => sessionStorage);
