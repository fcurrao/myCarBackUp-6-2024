import * as SQLite from 'expo-sqlite'; 
export const init = async () => {
    try {
        const db = await SQLite.openDatabaseAsync('sessions.db');
        
        // Crea la tabla si no existe
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS sessions (
                localId TEXT PRIMARY KEY NOT NULL, 
                email TEXT NOT NULL, 
                idToken TEXT NOT NULL
            );
        `);

        console.log('Tabla creada o ya existe');
    } catch (error) {
        console.error('Error inicializando la base de datos:', error);
        throw error; // Lanzar el error para que pueda ser manejado donde se llame a la función
    }
};

// Eliminar la tabla sessions si existe
export const dropTableSessions = async () => {
    try { 
        const db = await SQLite.openDatabaseAsync('sessions.db');
        await db.execAsync('DROP TABLE IF EXISTS sessions');
        console.log('Tabla sessions eliminada');
    } catch (error) {
        console.error('Error al eliminar la tabla sessions:', error);
        throw error;
    }
};

// Insertar una nueva sesión en la tabla sessions
export const insertSession = async ({ email, localId, idToken }) => {
    try { 
        const db = await SQLite.openDatabaseAsync('sessions.db');
        const result = await db.runAsync(
            'INSERT INTO sessions (email, localId, idToken) VALUES (?, ?, ?);',
            [email, localId, idToken]
        );
        return result;
    } catch (error) {
        console.error('Error al insertar la sesión:', error);
        throw error;
    }
};

// Obtener todas las sesiones de la tabla sessions
export const getSession = async () => { 
    const db = await SQLite.openDatabaseAsync('sessions.db');
    
    try {  
            
            console.log("estoy en getSession de SQL")
            const result = await db.getAllAsync('SELECT * FROM sessions');
            console.log("ersulttttt",result)
            return result; 
    } catch (error) { 
        console.error('Error al obtener las sesiones:', error);
        throw error; 
    }
};  

// Eliminar una sesión específica de la tabla sessions
export const deleteSession = async (localId) => {
    try { 
        const db = await SQLite.openDatabaseAsync('sessions.db');
        const result = await db.runAsync(
            'DELETE FROM sessions WHERE localId = ?',
            [localId]
        );
        return result;
    } catch (error) {
        console.error('Error al eliminar la sesión:', error);
        throw error;
    }
};