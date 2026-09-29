from app.core.config import settings
import psycopg

print('db_url_set=', bool(settings.database_url))
conn = psycopg.connect(settings.database_url)
try:
    cur = conn.cursor()
    cur.execute("SELECT table_name, column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name IN ('source_documents', 'source_sections') ORDER BY table_name, ordinal_position")
    rows = cur.fetchall()
    print(rows)
finally:
    conn.close()
