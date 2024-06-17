import sqlite3
import csv

# Connect to the SQLite database
conn = sqlite3.connect('userForms.db')
cursor = conn.cursor()

# Query to select all rows from the 'signups' table
query = "SELECT firstName, lastName, email, city, state FROM signups"
cursor.execute(query)

# Fetch all results
rows = cursor.fetchall()

# Open a CSV file to write the data
with open('output.csv', 'w', newline='') as file:
    csv_writer = csv.writer(file)
    # Write the header row
    csv_writer.writerow(['firstName', 'lastName', 'email', 'city', 'state'])
    # Write the data rows
    csv_writer.writerows(rows)

# Close the database connection
cursor.close()
conn.close()

print("Data exported successfully to output.csv")
