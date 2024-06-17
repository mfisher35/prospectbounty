import sqlite3


delete_query = """DELETE from signups where firstName = 'test' """

try:
    sqliteConnection = sqlite3.connect('userForms.db')
    cursor = sqliteConnection.cursor()
    print("Connected to SQLite")

    # Deleting single record now
    cursor.execute(delete_query)
    sqliteConnection.commit()
    print("Record deleted successfully ")
    cursor.close()

except sqlite3.Error as error:
    print("Failed to delete record from sqlite table", error)
finally:
    if sqliteConnection:
        sqliteConnection.close()
        print("the sqlite connection is closed")

