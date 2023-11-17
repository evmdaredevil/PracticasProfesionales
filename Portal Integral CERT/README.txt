1. Instalar Postgres: https://get.enterprisedb.com/postgresql/postgresql-16.0-1-windows-x64.exe
2. Instalar en Puerto 5433. Contraseña 'cenapred'
3. Instalar extensión PostGIS en StackBuilder de Postgres
4. Instalar Apache: https://www.apachelounge.com/download/VS17/binaries/httpd-2.4.58-win64-VS17.zip
5. Abrir PgAdmin. Crear base de datos 'CERTtest'
6. Ejercutar las Queries incluidas.
7. Copiar carpeta en el directorio a 'htdocs' en la carpeta de Apache.
8. Lanzar y llenar los formularios de los Portales cuando se necesite:
Ejemplo:
	*PortalG: Registra un Equipo en la BD.
	*PortalM: Registra un Miembro de un equipo dado en la BD.
	*Visor:   Muestra un mapa con la localización de los Equipos y datos de contacto del representante.
	*PortalAdmin: Permite eliminar registros de la BD.