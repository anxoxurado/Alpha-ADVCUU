-- Active: 1721428964438@@127.0.0.1@3306@VACUUDB
-- drop  database if exists VACUUDB;
create database VACUUDB;
use VACUUDB;

create table categorias(
id_categoria int auto_increment primary key,
nombre_categoria varchar(50)
);

create table ambientes(
id_ambiente int primary key auto_increment,
ambiente varchar(50) not null
);

create table lugares(
id_lugar int auto_increment primary key,
nombre_lugar varchar(50) not null,
caracteristica_1 varchar(20) not null,
caracteristica_2 varchar (20) not null,
caracteristica_3 varchar(20) not null,
calle varchar(50) not null,
numero varchar (50) not null,
colonia varchar(50) not null,
ciudad varchar(50) default 'Chihuahua',
link_mapsGoogle varchar(500) not null,
clicks int default(0),
precio int not null, -- Es el numero de signo de pesos que saldra
fk_categoria int not null,
fk_ambiente int not null,
fk_ambiente2 int,
foreign key (fk_categoria) references categorias(id_categoria),
foreign key (fk_ambiente) references ambientes(id_ambiente),
foreign key (fk_ambiente2) references ambientes (id_ambiente)
);

-- Imagen principal de cada Lugar
create table imagen_principal(
id_imgPrincipal int primary key auto_increment,
nombre_imgPrincipal varchar(100) not null,
ruta_imgPrincipal varchar(500) not null,
fk_lugar int not null,
foreign key(fk_lugar) references lugares(id_lugar)
);

-- Imagenes extra de cada lugar
create table imagenes_lugares(
id_imagen int primary key auto_increment,
nombre_imagen varchar(100) not null,
ruta_imagen varchar(500) not null,
fk_lugar int not null,
foreign key(fk_lugar) references lugares(id_lugar)
);

/*--------------------------------PEGAR AQUI LAS INSERCIONES DEL ARCHIVO DE INSERCION DE DATOS AL CORRER LA BASE DE DATOS------------------------*/

-- Insertar categorias
insert into categorias(nombre_categoria)
values
		('Cafe'),				-- id 1
        ('Restaurante'),		-- id 2
        ('Restaurante-bar'),	-- id 3
        ('Bar'),				-- id 4
        ('Cultural');			-- id 5
        
        
 insert into ambientes(ambiente)
 values 	
		('Familiar'), -- Id 1
        ('Amigos'), -- Id 2
        ('Pareja'), -- Id 3
        ('Chill'); -- Id 4
        

-- Insertar datos en lugares
insert into lugares (nombre_lugar, caracteristica_1, caracteristica_2, caracteristica_3, calle, numero, colonia, link_mapsGoogle, precio, fk_categoria, fk_ambiente, fk_ambiente2)
values 
	/* 							FK_AMBIENTES:       Familiar(1), 	Amigos(2),		Pareja(3),		Chill(4) 						*/
		-- CAFES (fk_categoria = 1)
		('Kaldi Café', 'Especializado', 'Acogedor', 'Popular', 'Calle Guadalupe Victoria', '309', 'Centro', 'https://maps.app.goo.gl/WmkZifVHdSbCDCqu9', 2, 1, 4, 3), 		
		('Corinto', 'Bonito', 'Tranquilo', 'Popular', 'C. Colegio San Marco', '1828', 'Misión Universidad II', 'https://maps.app.goo.gl/ofYB8znuYCArgBRN8', 2, 1, 4, 3),
        ('Mándala Café', 'Bonito', 'Popular', 'Accesible', 'C. Priv. de Urquidi', '905', 'San Fernando', 'https://maps.app.goo.gl/nMpLVMKkZr7PSgfcA', 2, 1, 2, 3),
        ('Café Cortez', 'Elegante', 'Bonito', 'Rico', 'Gómez Farias', '8', ' Zona Centro', 'https://maps.app.goo.gl/Ew7jTc9A8zvAXwRQ6', 1, 1, 2, 1),
        ('Rosetta Coffee', 'Aromático', 'Acogedor', 'Gourmet', 'Av. Venustiano Carranza', '1201', 'Zona Centro', 'https://maps.app.goo.gl/ADxvptt785hyjPhi6', 2, 1, 4, 3),
        ('SecÖnjom', 'Alternativo', 'Único', 'Hogar', 'C. Sexta', '2009', 'Bolívar', 'https://maps.app.goo.gl/AQ7QQ9urscKgoGEm8', 2, 1, 4, 3),
        ('Cafetto', 'Acogedor', 'Íntimo', 'Artesanal', 'Av Pascual Orozco', '317 B', 'San Felipe I Etapa', 'https://maps.app.goo.gl/eQhBUS66ETpQ431L8', 2, 1, 3, 4),
        ('Café Combate Zarco', 'Enérgico', 'Vibrante', 'Tranquilo', 'Av. Francisco Zarco', '4226', 'Zarco', 'https://maps.app.goo.gl/ftZNLbwK4tvT6PV56', 2, 1, 4, 3),
        ('Café del Alma Centro', 'Arte', 'Tranquilo', 'Reflexivo', 'C. Juan Aldama', '1002', 'Zona Centro II', 'https://maps.app.goo.gl/eCERK4WxR3z7tuTX9', 2, 1, 3, 1),
        ('Verona Café & Restaurante', 'Italiano', 'Creativo', 'Gastronómico', 'Ramírez Calderon y, C. Ortiz de Campos', '2101-5', 'San Felipe I Etapa', 'https://maps.app.goo.gl/8HHu2pEoeiMVwfjW6', 2, 1, 3, 4),
        ('El Hojaldre', 'Gourmet', 'Brunch', 'Repostería', 'Calle Ignacio Allende', '200', 'Zona Centro', 'https://maps.app.goo.gl/Pf8DTRguAhoL88tW9', 2, 1, 3, 1),
        ('Mozao Café', 'Moderno', 'Juvenil', 'Repostería', 'Av. Antonio de Deza Y Ulloa', '306', 'San Felipe I Etapa', 'https://maps.app.goo.gl/Z5xTzRhA5vQ31d967', 1, 1, 3, 1),
        ('Café Marro', 'Natural', 'Relajante', 'Artesanal', 'Independencia y Bolívar', '31000', 'Zona Centro', 'https://maps.app.goo.gl/HTeQm85YrLgnN9HSA', 2, 1, 4, 3),
        ('Fresh, coffee & cakes', 'Fresco', 'Ligero', 'Saludable', 'C. Pipila', '2017', 'Bolívar', 'https://maps.app.goo.gl/pXhzqRuJUs6CKGjCA', 2, 1, 4, 3),
        
        -- RESTAURANTE (fk_categoria = 2)
        ('Konga Burger Centro', 'Elegante', 'Bonito', 'Rico', 'C. 15', '109', ' Zona Centro,', 'https://maps.app.goo.gl/hF3SSx1nwpYS6TGR8', 2, 2, 1, 2),
        ('Taquería Mixe oaxaca', 'Barato', 'Bonito', 'Rico', 'C. Mariano Jiménez', '1104', 'Obrera', 'https://maps.app.goo.gl/i26ZpgWKNpMZtUCJ7', 1, 2, 1, 2),
        ('Cafeteria Chelinos', 'Tradicional', 'Familiar', 'Casero', 'Av San Felipe', '5', 'San Felipe II Etapa', 'https://maps.app.goo.gl/TJ6R7mhrNFppgfHb9', 1, 2, 1, 4),
        
        -- RESTAURANTES-BAR (fk_categoria = 3)
        ('Bar San Luis', 'Tailandes', 'Alitas', 'Amigos', 'C. Manuel Doblado', '1321', 'Centro', 'https://maps.app.goo.gl/xdq1n1Yy1cHD1CnVA', 2, 3, 2, 1),
        ('Cerveceria 19 Centro', 'Economico', 'Snacks', 'Variado', ' C. 13a', '136', 'Zona Centro', 'https://maps.app.goo.gl/2QErFKxUsRkH7ibLA', 1, 3, 2, 1),
        ('Restaurant Bar La Roca', 'Tradicional', 'Auténtico', 'Mexicano', 'C. Progreso', '202', 'Centro', 'https://maps.app.goo.gl/MHVmFyMzH38MXpSy6', 2, 3, 1, 2),
        ('Hank Bar', 'Moderno', 'Artesanal', 'Relajado', 'C. Juan Aldama', '411-Interior 5', 'Centro', 'https://maps.app.goo.gl/1JGAh8azF6z5Pfkv5', 2, 3, 2, 4),
        ('La Sotolería', 'Regional', 'Tradicional', 'Artesanal', 'C. Jose Maria Morelos', '801', 'Centro', 'https://maps.app.goo.gl/schNmfeX9j8jmi2e9', 2, 3, 1, 3),
        ('El Centenario', 'Histórico', 'Elegante', 'Tradicional', 'C. Jose Esteban Coronado', '503', 'Centro', 'https://maps.app.goo.gl/67gwzX4mSveBRR3A9', 3, 3, 1, 3),
        ('Coliseo Restaurante Bar', 'Familiar', 'Mexicano', 'Versátil', 'C. Jose Maria Morelos', '103', 'Centro', 'https://maps.app.goo.gl/yVGqYctKEFNixAY48', 2, 3, 1, 2),
        ('La Antigua Paz Cantina Tradicional', 'Tradicional', 'Histórico', 'Auténtico', 'Calle Francisco Xavier Mina', 'S/N', 'Centro', 'https://maps.app.goo.gl/wwjPxoUXgyhMifPj8', 2, 3, 2, null),
        ('Barrio Centro Restaurant-Bar', 'Acogedor', 'Mexicano', 'Céntrico', 'Calle Ignacio de la Llave', '208', 'Centro', 'https://maps.app.goo.gl/JXi5GbXBhWXSJEuA7', 2, 3, 1, 2),
        
        -- BAR  (fk_categoria = 4)
        ('Studio Bar', 'Popular', 'Animado', 'Versátil', 'Av. Prol. Teófilo Borunda', '1210', 'Unidad Presidentes', 'https://maps.app.goo.gl/YQmkZXrJU7RvR2SFA', 2, 4, 2, 3),
        ('Gabba Gabba', 'Juvenil', 'Céntrico', 'Diverso', 'Calle Ojinaga', '110', 'Centro', 'https://maps.app.goo.gl/imTQewSsoajB3qzU6', 2, 4, 2, 3),
        ('The Hunter Cuu', 'Karaoke', 'Música', 'Animado', 'Av. Colón', '213-205', 'Centro', 'https://maps.app.goo.gl/rHygz44RZLPrRaeG6', 2, 4, 2, 3),
        ('El Cuervo Rock Bar', 'Rock', 'Música', 'Animado', 'Av. Prol. Teófilo Borunda', '103', 'San Felipe I Etapa', 'https://maps.app.goo.gl/Jq9m7PzMpCBYJeU68', 2, 4, 2, 3),
		('Casa Cervecera Bolívar', 'Artesanal', 'Gourmet', 'Rústico-moderno', 'Paseo Simon Bolivar', '806', 'Centro', 'https://maps.app.goo.gl/fWuHdTfYjoZBCz5dA', 2, 4, 2, 3),
        ('Downtown Bistro Bar', 'Sofisticado', 'Internacional', 'Céntrico', 'Paseo Simon Bolivar', '417', 'Centro', 'https://maps.app.goo.gl/1DxpALKt6XsofNmq7', 3, 4, 3, 2),
        ('Angels Bar', 'Moderno', 'Nocturno', 'Musical', 'C. Juan Aldama', '3301', 'Chihuahua', 'https://maps.app.goo.gl/ipRoJgDtJwqVmZC46', 2, 4, 2, 3),
        ('Centro Alegre Bar', 'Tradicional', 'Relajado', 'Acogedor', 'Calle Nicolás Bravo', '2909', 'Centro', 'https://maps.app.goo.gl/xAxpYfCg7cazFMhF7', 2, 4, 2, 4),
        ('Cabaña bar', 'Rústico', 'Casual', 'Acogedor', 'Av. Independencia', '1900A', 'El Palomar', 'https://maps.app.goo.gl/9W21ukoDgbdDsex87', 2, 4, 2, 1),
        ('Bar Bandidos', 'Temático', 'Western', 'Animado', 'C. Juan Aldama', '2310', 'Zona Centro', 'https://maps.app.goo.gl/rrXWETfCAjwi7fhU6', 2, 4, 2, 3),
        ('Bar Morelos', 'Céntrico', 'Tradicional', 'Relajado', 'C. Jose Maria Morelos', '121', 'Centro', 'https://maps.app.goo.gl/MHweB2nHZgZD9StL6', 2, 4, 2, 4),
        ('El Mágico', 'Creativo', 'Mágico', 'Entretenido', 'Av. Independencia', '1204', 'Centro', 'https://maps.app.goo.gl/x8ZyH1NncVQ8uAqq7', 2, 4, 2, 3),
        ('Bar Zeppelin', 'Rock', 'Temático', 'Juvenil', 'C. Quinta', '303', 'Zona Centro', 'https://maps.app.goo.gl/QUafkPgwTPDpwJ4e8', 2, 4, 2, 3),
        
        -- CULTURALES (fk_categoria = 5)
        ('Museo del Mamut', 'Paleontología', 'Mamuts', 'Prehistoria', 'Avenida Juárez', '2506', 'Centro', 'https://maps.app.goo.gl/DrLwxdpGt9doLb9h9', 1, 5, 2, 1),
        ('Museo Semilla', 'Interactivo', 'Ciencia', 'Educativo', 'Priv. Progreso', '1201', 'Centro', 'https://maps.app.goo.gl/6LmpUmxWqLki5NWy5', 1, 5, 1, 2),
        ('Casa Redonda', 'Arte', 'Ferrocarril', 'Contemporáneo', 'Av. Tecnológico', '1705', 'Santo Niño', 'https://maps.app.goo.gl/pThzG4gueRjj6F2fA', 1, 5, 1, 3),
        ('Casa Chihuahua Centro de Patrimonio Cultural', 'Patrimonio', 'Historia', 'Cultural', 'Libertad', '901', 'Centro', 'https://maps.app.goo.gl/iALQaUJFYo2UFLb78', 1, 5, 1, 2),
        ('Museo de la Lealtad Republicana Casa Juárez', 'Histórico', 'Republicano', 'Juárez', 'Av. Benito Juarez', '321', 'Centro', 'https://maps.app.goo.gl/EtShxVRbcTyjuzL37', 1, 5, 1, 2),
        ('Museo Sebastián Casa Siglo XIX', 'Arquitectura', 'Patrimonio', 'Cultural', 'Av. Benito Juárez', '601', 'Parque Rotario', 'https://maps.app.goo.gl/YEe5FS9ruteDRDRV6', 1, 5, 1, 3),
        ('Catedral de Chihuahua', 'Barroco', 'Colonial', 'Religioso', 'Calle Libertad y Calle Victoria', 'S/N', 'Centro', 'https://maps.app.goo.gl/zio1PPZ1U5ZfnxiSA', 1, 5, 1, 3),
        ('Plaza del Mariachi', 'Música', 'Tradición', 'Cultura', 'C. Juan Aldama', 'S/N', 'Centro', 'https://maps.app.goo.gl/D1PdDP2qhnmACYxx6', 1, 5, 2, 3),
        ('Parque Lerdo', 'Recreación', 'Histórico', 'Céntrico', 'Av. Melchor Ocampo', 'S/N', 'Centro', 'https://maps.app.goo.gl/qcXJdkRuDRUCcbRAA', 1, 5, 1, 4),
        ('Quinta Gameros', 'Art nouveau', 'Arquitectura', 'Cultural', 'Paseo Bolívar', '401', 'Centro', 'https://maps.app.goo.gl/2DWynSh4v92d9Qfv7', 1, 5, 1, 3);
        
        
        

            
-- Insertar imagenes principal de lugares (poner "." y el formato en el nombre)        
insert into imagen_principal (nombre_imgPrincipal, ruta_imgPrincipal, fk_lugar)
values		
			-- CAFES
            ('kaldi-Cafe.jpg','/lugares/imagenes_lugares', 1),
			('corinto.jpg','/lugares/imagenes_lugares', 2),
            ('mandala-cafe.jpg','/lugares/imagenes_lugares', 3),
            ('cafe-cortez.jpg','/lugares/imagenes_lugares', 4),
            ('rosetta-coffee.jpg','/lugares/imagenes_lugares', 5),
            ('secÖnjom.jpg','/lugares/imagenes_lugares', 6),
            ('cafetto.jpg','/lugares/imagenes_lugares', 7),
            ('cafe-combate-zarco.jpg','/lugares/imagenes_lugares', 8),
            ('cafedelalma-centro.jpg','/lugares/imagenes_lugares', 9),
            ('verona-cafe.jpg','/lugares/imagenes_lugares', 10),
            ('el-hojaldre.jpg','/lugares/imagenes_lugares', 11),
            ('mozao-cafe.jpg','/lugares/imagenes_lugares', 12),
            ('cafe-marro.jpg','/lugares/imagenes_lugares', 13),
			('fresh-coffee-cakes.jpg','/lugares/imagenes_lugares', 14),
            
			-- RESTAURANTES
            ('konga-burger-centro.jpg','/lugares/imagenes_lugares', 15),
            ('taqueria-mixe-oaxaca.jpg','/lugares/imagenes_lugares', 16),
            ('cafeteria-chelinos.jpg','/lugares/imagenes_lugares', 17),
            
            -- RESTAURANTES-BAR
            ('bar-san-luis.jpg','/lugares/imagenes_lugares', 18),
            ('cerveceria-19-centro.jpg','/lugares/imagenes_lugares', 19),
            ('restaurant-bar-la-roca.jpg','/lugares/imagenes_lugares', 20),
            ('hank-bar.jpg','/lugares/imagenes_lugares', 21),
            ('la-sotoleria.jpg','/lugares/imagenes_lugares', 22),
            ('el-centenario.jpg','/lugares/imagenes_lugares', 23),
            ('coliseo-restaurante-bar.jpg','/lugares/imagenes_lugares', 24),
            ('la-antigua-paz-cantina-tradicional.jpg','/lugares/imagenes_lugares', 25),
            ('barrio-centro-restaurant-bar.jpg','/lugares/imagenes_lugares', 26),
            
            -- BAR
            ('studio-bar.jpg','/lugares/imagenes_lugares', 27),
            ('gabba-gabba.jpg','/lugares/imagenes_lugares', 28),
            ('the-hunter-cuu.jpg','/lugares/imagenes_lugares', 29),
            ('el-cuervo-rock-bar.jpeg','/lugares/imagenes_lugares', 30),
            ('casa-cervecera-bolivar.jpg','/lugares/imagenes_lugares', 31),
            ('downtown-bistro-bar.jpg','/lugares/imagenes_lugares', 32),
            ('angels-bar.jpg','/lugares/imagenes_lugares', 33),
            ('centro-alegre-bar.jpg','/lugares/imagenes_lugares', 34),
            ('cabaña-bar.jpg','/lugares/imagenes_lugares', 35),
            ('bar-bandidos.jpg','/lugares/imagenes_lugares', 36),
            ('bar-morelos.jpg','/lugares/imagenes_lugares', 37),
            ('el-magico.jpg','/lugares/imagenes_lugares', 38),
            ('bar-zeppelin.jpg','/lugares/imagenes_lugares', 39),

            -- CULTURALES
            ('museo-del-mamut.jpg','/lugares/imagenes_lugares', 40),
            ('museo-semilla.jpg','/lugares/imagenes_lugares', 41),
            ('casa-redonda.jpg','/lugares/imagenes_lugares', 42),
            ('casa-chihuahua.jpg','/lugares/imagenes_lugares', 43),
            ('casa-juarez.jpg','/lugares/imagenes_lugares', 44),
            ('museo-sebastian-casa-siglo-xix.jpg','/lugares/imagenes_lugares', 45),
            ('catedral-de-chihuahua.jpg','/lugares/imagenes_lugares', 46),
            ('plaza-del-mariachi.jpg','/lugares/imagenes_lugares', 47),
            ('parque-lerdo.jpg','/lugares/imagenes_lugares', 48),
            ('quinta-gameros.jpeg','/lugares/imagenes_lugares', 49);

-- Insertar imagenes extras de lugares (poner "." y el formato en el nombre) 
insert into imagenes_lugares (nombre_imagen, ruta_imagen, fk_lugar)
values      -- CAFES
            ('kaldi-cafe1.jpg','/lugares/imagenes_lugares/imagenes_extra',1),
            ('kaldi-cafe2.jpg','/lugares/imagenes_lugares/imagenes_extra',1),
            ('kaldi-cafe3.jpg','/lugares/imagenes_lugares/imagenes_extra',1),
            ('corinto1.jpg','/lugares/imagenes_lugares/imagenes_extra',2),
            ('corinto2.jpg','/lugares/imagenes_lugares/imagenes_extra',2),
            ('corinto3.jpg','/lugares/imagenes_lugares/imagenes_extra',2),
            ('mandala-cafe1.jpg','/lugares/imagenes_lugares/imagenes_extra',3),
            ('mandala-cafe2.jpg','/lugares/imagenes_lugares/imagenes_extra',3),
            ('mandala-cafe3.jpg','/lugares/imagenes_lugares/imagenes_extra',3),
            ('cafe-cortez1.jpg','/lugares/imagenes_lugares/imagenes_extra',4),
            ('cafe-cortez2.jpg','/lugares/imagenes_lugares/imagenes_extra',4),
            ('cafe-cortez3.jpg','/lugares/imagenes_lugares/imagenes_extra',4),
            ('rosetta-coffee1.jpg','/lugares/imagenes_lugares/imagenes_extra',5),
            ('rosetta-coffee2.jpg','/lugares/imagenes_lugares/imagenes_extra',5),
            ('rosetta-coffee3.jpg','/lugares/imagenes_lugares/imagenes_extra',5),
            ('secÖnjom1.jpg','/lugares/imagenes_lugares/imagenes_extra',6),
            ('secÖnjom2.jpg','/lugares/imagenes_lugares/imagenes_extra',6),
            ('secÖnjom3.jpg','/lugares/imagenes_lugares/imagenes_extra',6),
            ('cafetto1.png','/lugares/imagenes_lugares/imagenes_extra',7),
            ('cafetto2.jpg','/lugares/imagenes_lugares/imagenes_extra',7),
            ('cafetto3.jpg','/lugares/imagenes_lugares/imagenes_extra',7),
            ('cafe-combate-zarco1.jpg','/lugares/imagenes_lugares/imagenes_extra',8),
            ('cafe-combate-zarco2.jpg','/lugares/imagenes_lugares/imagenes_extra',8),
            ('cafe-combate-zarco3.jpg','/lugares/imagenes_lugares/imagenes_extra',8),
            ('cafedelalma-centro1.jpg','/lugares/imagenes_lugares/imagenes_extra',9),
            ('cafedelalma-centro2.jpg','/lugares/imagenes_lugares/imagenes_extra',9),
            ('cafedelalma-centro3.jpg','/lugares/imagenes_lugares/imagenes_extra',9),
            ('verona-cafe1.jpg','/lugares/imagenes_lugares/imagenes_extra',10),
            ('verona-cafe2.jpg','/lugares/imagenes_lugares/imagenes_extra',10),
            ('verona-cafe3.jpg','/lugares/imagenes_lugares/imagenes_extra',10),
            ('el-hojaldre1.jpg','/lugares/imagenes_lugares/imagenes_extra',11),
            ('el-hojaldre2.jpg','/lugares/imagenes_lugares/imagenes_extra',11),
            ('el-hojaldre3.jpg','/lugares/imagenes_lugares/imagenes_extra',11),
            ('mozao-cafe1.png','/lugares/imagenes_lugares/imagenes_extra',12),
            ('mozao-cafe2.jpg','/lugares/imagenes_lugares/imagenes_extra',12),
            ('mozao-cafe3.jpg','/lugares/imagenes_lugares/imagenes_extra',12),
            ('cafe-marro1.jpg','/lugares/imagenes_lugares/imagenes_extra',13),
            ('cafe-marro2.jpg','/lugares/imagenes_lugares/imagenes_extra',13),
            ('cafe-marro3.jpg','/lugares/imagenes_lugares/imagenes_extra',13),
            ('fresh-coffee-cakes1.jpeg','/lugares/imagenes_lugares/imagenes_extra',14),
            ('fresh-coffee-cakes2.jpeg','/lugares/imagenes_lugares/imagenes_extra',14),
            ('fresh-coffee-cakes3.jpg','/lugares/imagenes_lugares/imagenes_extra',14),
            
            -- RESTAURANTES
            ('konga-burger-centro1.jpg','/lugares/imagenes_lugares/imagenes_extra',15),
            ('konga-burger-centro2.jpg','/lugares/imagenes_lugares/imagenes_extra',15),
            ('konga-burger-centro3.jpeg','/lugares/imagenes_lugares/imagenes_extra',15),
            ('taqueria-mixe-oaxaca1.jpg','/lugares/imagenes_lugares/imagenes_extra',16),
            ('taqueria-mixe-oaxaca2.jpg','/lugares/imagenes_lugares/imagenes_extra',16),
            ('taqueria-mixe-oaxaca3.jpg','/lugares/imagenes_lugares/imagenes_extra',16),
            ('cafeteria-chelinos1.jpg','/lugares/imagenes_lugares/imagenes_extra',17),
            ('cafeteria-chelinos2.jpg','/lugares/imagenes_lugares/imagenes_extra',17),
            ('cafeteria-chelinos3.jpg','/lugares/imagenes_lugares/imagenes_extra',17),

            -- RESTAURANTE-BAR
            ('bar-san-luis1.jpg','/lugares/imagenes_lugares/imagenes_extra',18),
            ('bar-san-luis2.jpg','/lugares/imagenes_lugares/imagenes_extra',18),
            ('bar-san-luis3.jpg','/lugares/imagenes_lugares/imagenes_extra',18),
            ('cerveceria-19-centro1.jpg','/lugares/imagenes_lugares/imagenes_extra',19),
            ('cerveceria-19-centro2.jpg','/lugares/imagenes_lugares/imagenes_extra',19),
            ('cerveceria-19-centro3.jpg','/lugares/imagenes_lugares/imagenes_extra',19),
            ('restaurant-bar-la-roca1.jpg','/lugares/imagenes_lugares/imagenes_extra',20),
            ('restaurant-bar-la-roca2.jpg','/lugares/imagenes_lugares/imagenes_extra',20),
            ('restaurant-bar-la-roca3.png','/lugares/imagenes_lugares/imagenes_extra',20),
            ('hank-bar1.jpg','/lugares/imagenes_lugares/imagenes_extra',21),
            ('hank-bar2.jpg','/lugares/imagenes_lugares/imagenes_extra',21),
            ('hank-bar3.jpg','/lugares/imagenes_lugares/imagenes_extra',21),
            ('la-sotoleria1.jpg','/lugares/imagenes_lugares/imagenes_extra',22),
            ('la-sotoleria2.jpg','/lugares/imagenes_lugares/imagenes_extra',22),
            ('la-sotoleria3.jpg','/lugares/imagenes_lugares/imagenes_extra',22),
            ('el-centenario1.jpg','/lugares/imagenes_lugares/imagenes_extra',23),
            ('el-centenario2.jpg','/lugares/imagenes_lugares/imagenes_extra',23),
            ('el-centenario3.jpg','/lugares/imagenes_lugares/imagenes_extra',23),
            ('coliseo-restaurante-bar1.jpg','/lugares/imagenes_lugares/imagenes_extra',24),
            ('coliseo-restaurante-bar2.jpg','/lugares/imagenes_lugares/imagenes_extra',24),
            ('coliseo-restaurante-bar3.jpg','/lugares/imagenes_lugares/imagenes_extra',24),
            ('la-antigua-paz-cantina-tradicional1.jpg','/lugares/imagenes_lugares/imagenes_extra',25),
            ('la-antigua-paz-cantina-tradicional2.jpg','/lugares/imagenes_lugares/imagenes_extra',25),
            ('la-antigua-paz-cantina-tradicional3.jpg','/lugares/imagenes_lugares/imagenes_extra',25),
            ('barrio-centro-restaurant-bar1.jpg','/lugares/imagenes_lugares/imagenes_extra',26),
            ('barrio-centro-restaurant-bar2.jpg','/lugares/imagenes_lugares/imagenes_extra',26),
            ('barrio-centro-restaurant-bar3.jpg','/lugares/imagenes_lugares/imagenes_extra',26),

            -- BAR
            ('studio-bar1.jpg','/lugares/imagenes_lugares/imagenes_extra',27),
            ('studio-bar2.jpg','/lugares/imagenes_lugares/imagenes_extra',27),
            ('studio-bar3.jpg','/lugares/imagenes_lugares/imagenes_extra',27),
            ('gabba-gabba1.png','/lugares/imagenes_lugares/imagenes_extra',28),
            ('gabba-gabba2.jpg','/lugares/imagenes_lugares/imagenes_extra',28),
            ('gabba-gabba3.jpg','/lugares/imagenes_lugares/imagenes_extra',28),
            ('the-hunter-cuu1.jpg','/lugares/imagenes_lugares/imagenes_extra',29),
            ('the-hunter-cuu2.jpg','/lugares/imagenes_lugares/imagenes_extra',29),
            ('the-hunter-cuu3.jpg','/lugares/imagenes_lugares/imagenes_extra',29),
            ('el-cuervo-rock-bar1.jpg','/lugares/imagenes_lugares/imagenes_extra',30),
            ('el-cuervo-rock-bar2.jpg','/lugares/imagenes_lugares/imagenes_extra',30),
            ('el-cuervo-rock-bar3.jpg','/lugares/imagenes_lugares/imagenes_extra',30),
            ('casa-cervecera-bolivar1.jpg','/lugares/imagenes_lugares/imagenes_extra',31),
            ('casa-cervecera-bolivar2.jpg','/lugares/imagenes_lugares/imagenes_extra',31),
            ('casa-cervecera-bolivar3.jpg','/lugares/imagenes_lugares/imagenes_extra',31),
            ('downtown-bistro-bar1.jpg','/lugares/imagenes_lugares/imagenes_extra',32),
            ('downtown-bistro-bar2.jpg','/lugares/imagenes_lugares/imagenes_extra',32),
            ('downtown-bistro-bar3.jpg','/lugares/imagenes_lugares/imagenes_extra',32),
            ('angels-bar1.jpg','/lugares/imagenes_lugares/imagenes_extra',33),
            ('angels-bar2.jpg','/lugares/imagenes_lugares/imagenes_extra',33),
            ('angels-bar3.jpg','/lugares/imagenes_lugares/imagenes_extra',33),
            ('centro-alegre-bar1.jpg','/lugares/imagenes_lugares/imagenes_extra',34),
            ('centro-alegre-bar2.jpg','/lugares/imagenes_lugares/imagenes_extra',34),
            ('centro-alegre-bar3.jpg','/lugares/imagenes_lugares/imagenes_extra',34),
            ('cabaña-bar1.jpg','/lugares/imagenes_lugares/imagenes_extra',35),
            ('cabaña-bar2.jpg','/lugares/imagenes_lugares/imagenes_extra',35),
            ('cabaña-bar3.jpg','/lugares/imagenes_lugares/imagenes_extra',35),
            ('bar-bandidos1.jpg','/lugares/imagenes_lugares/imagenes_extra',36),
            ('bar-bandidos2.jpg','/lugares/imagenes_lugares/imagenes_extra',36),
            ('bar-bandidos3.jpg','/lugares/imagenes_lugares/imagenes_extra',36),
            ('bar-morelos1.jpg','/lugares/imagenes_lugares/imagenes_extra',37),
            ('bar-morelos2.jpg','/lugares/imagenes_lugares/imagenes_extra',37),
            ('bar-morelos3.jpg','/lugares/imagenes_lugares/imagenes_extra',37),
            ('el-magico1.jpg','/lugares/imagenes_lugares/imagenes_extra',38),
            ('el-magico2.jpg','/lugares/imagenes_lugares/imagenes_extra',38),
            ('el-magico3.jpg','/lugares/imagenes_lugares/imagenes_extra',38),
            ('bar-zeppelin1.jpg','/lugares/imagenes_lugares/imagenes_extra',39),
            ('bar-zeppelin2.jpg','/lugares/imagenes_lugares/imagenes_extra',39),
            ('bar-zeppelin3.jpg','/lugares/imagenes_lugares/imagenes_extra',39),

            -- CULTURALES
            ('museo-del-mamut1.jpg','/lugares/imagenes_lugares/imagenes_extra',40),
            ('museo-del-mamut2.jpg','/lugares/imagenes_lugares/imagenes_extra',40),
            ('museo-del-mamut3.jpg','/lugares/imagenes_lugares/imagenes_extra',40),
            ('museo-semilla1.jpg','/lugares/imagenes_lugares/imagenes_extra',41),
            ('museo-semilla2.jpeg','/lugares/imagenes_lugares/imagenes_extra',41),
            ('museo-semilla3.jpg','/lugares/imagenes_lugares/imagenes_extra',41),
            ('casa-redonda1.jpg','/lugares/imagenes_lugares/imagenes_extra',42),
            ('casa-redonda2.jpg','/lugares/imagenes_lugares/imagenes_extra',42),
            ('casa-redonda3.jpg','/lugares/imagenes_lugares/imagenes_extra',42),
            ('casa-chihuahua1.jpg','/lugares/imagenes_lugares/imagenes_extra',43),
            ('casa-chihuahua2.jpg','/lugares/imagenes_lugares/imagenes_extra',43),
            ('casa-chihuahua3.jpg','/lugares/imagenes_lugares/imagenes_extra',43),
            ('casa-juarez1.jpg','/lugares/imagenes_lugares/imagenes_extra',44),
            ('casa-juarez2.jpg','/lugares/imagenes_lugares/imagenes_extra',44),
            ('casa-juarez3.jpg','/lugares/imagenes_lugares/imagenes_extra',44),
            ('museo-sebastian-casa-siglo-xix1.jpg','/lugares/imagenes_lugares/imagenes_extra',45),
            ('museo-sebastian-casa-siglo-xix2.png','/lugares/imagenes_lugares/imagenes_extra',45),
            ('museo-sebastian-casa-siglo-xix3.jpg','/lugares/imagenes_lugares/imagenes_extra',45),
            ('catedral-de-chihuahua1.jpg','/lugares/imagenes_lugares/imagenes_extra',46),
            ('catedral-de-chihuahua2.jpg','/lugares/imagenes_lugares/imagenes_extra',46),
            ('catedral-de-chihuahua3.jpg','/lugares/imagenes_lugares/imagenes_extra',46),
            ('plaza-del-mariachi1.jpeg','/lugares/imagenes_lugares/imagenes_extra',47),
            ('plaza-del-mariachi2.jpg','/lugares/imagenes_lugares/imagenes_extra',47),
            ('plaza-del-mariachi3.jpg','/lugares/imagenes_lugares/imagenes_extra',47),
            ('parque-lerdo1.jpg','/lugares/imagenes_lugares/imagenes_extra',48),
            ('parque-lerdo2.jpg','/lugares/imagenes_lugares/imagenes_extra',48),
            ('parque-lerdo3.jpeg','/lugares/imagenes_lugares/imagenes_extra',48),
            ('quinta-gameros1.jpg','/lugares/imagenes_lugares/imagenes_extra',49),
            ('quinta-gameros2.jpg','/lugares/imagenes_lugares/imagenes_extra',49),
            ('quinta-gameros3.jpg','/lugares/imagenes_lugares/imagenes_extra',49);


select * from lugares;


-- Consulta para ver todos los lugares con nombre de categoria y sus imagenes
SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal, a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2 
from lugares l 
JOIN categorias c ON l.fk_categoria = c.id_categoria
JOIN ambientes a ON l.fk_ambiente = id_ambiente
JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
ORDER BY l.id_lugar;

-- Consulta para ver todo de un lugar en especifico por nombre
SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
from lugares l 
JOIN categorias c ON l.fk_categoria = c.id_categoria
JOIN ambientes a ON l.fk_ambiente = id_ambiente
JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
WHERE l.nombre_lugar = 'Corinto';

-- Consulta para ver todo de un lugar en especifico por ID
SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
from lugares l 
JOIN categorias c ON l.fk_categoria = c.id_categoria
JOIN ambientes a ON l.fk_ambiente = id_ambiente
JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
WHERE l.id_lugar = 1;


-- Consulta para poder ver lugares de la misma categoria sin arrojar el lugar consultado
SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal, a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2 
FROM lugares l
JOIN categorias c ON l.fk_categoria = c.id_categoria
JOIN ambientes a ON l.fk_ambiente = id_ambiente
JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
WHERE l.fk_categoria = (select fk_categoria from lugares where nombre_lugar = 'corinto') and l.nombre_lugar != 'corinto'
and (l.fk_ambiente = (SELECT fk_ambiente FROM lugares WHERE nombre_lugar = 'corinto')
OR l.fk_ambiente2 = (SELECT fk_ambiente FROM lugares WHERE nombre_lugar = 'corinto'))
order by clicks DESC LIMIT 10;




/* 	--------------------------------------------------------------------------------------------------	
							CONSULTAR LOS MEJORES 10 LUGARES POR CATEGORIA 
	-------------------------------------------------------------------------------------------------- */
    
-- CONSULTA PARA MOSTRAR TOP 10 CAFES
SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
FROM lugares l 
    JOIN categorias c ON l.fk_categoria = c.id_categoria
    JOIN ambientes a ON l.fk_ambiente = id_ambiente
    JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
    WHERE c.nombre_categoria = 'cafe' 
    order by clicks DESC LIMIT 10 ;
    
-- CONSULTA PARA MOSTRAR TOP 10 RESTAURANTES
SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
FROM lugares l 
    JOIN categorias c ON l.fk_categoria = c.id_categoria
    JOIN ambientes a ON l.fk_ambiente = id_ambiente
    JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
    WHERE c.nombre_categoria = 'restaurante' OR c.nombre_categoria = 'restaurante-bar' 
    order by clicks DESC LIMIT 10 ;  
    
-- CONSULTA PARA MOSTRAR TOP 10 BARES
SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
FROM lugares l 
    JOIN categorias c ON l.fk_categoria = c.id_categoria
    JOIN ambientes a ON l.fk_ambiente = id_ambiente
    JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
    WHERE c.nombre_categoria = 'bar' OR c.nombre_categoria = 'restaurante-bar' 
    order by clicks DESC LIMIT 10 ;
    

-- CONSULTA PARA MOSTRAR TOP 10 LUGARES CULTURALES
SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
FROM lugares l 
    JOIN categorias c ON l.fk_categoria = c.id_categoria
    JOIN ambientes a ON l.fk_ambiente = id_ambiente
    JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
    WHERE c.nombre_categoria = 'culturales' order by clicks 
    DESC LIMIT 10;
    
    
-- CONSULTA DE LUGARES CON FILTRO DE CATEGORIA Y PRECIO

    SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal,  a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2
	FROM lugares l 
	JOIN categorias c ON l.fk_categoria = c.id_categoria
	JOIN ambientes a ON l.fk_ambiente = id_ambiente
	JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
	WHERE (c.nombre_categoria = 'restaurante' or c.nombre_categoria ='restaurante-bar') AND l.precio = '2' 
	order by clicks DESC;

-- MOSTRAR LUGARES SIMILARES Y QUE TAMBIEN MUESTRE DE LA CATEGORIA RESTAURANTE-BAR
    SELECT l.*, c.nombre_categoria, i.nombre_imgPrincipal, i.ruta_imgPrincipal, a.ambiente, (select ambiente from ambientes where id_ambiente  = l.fk_ambiente2) as ambiente2 
        FROM lugares l
        JOIN categorias c ON l.fk_categoria = c.id_categoria
        JOIN ambientes a ON l.fk_ambiente = id_ambiente
        JOIN imagen_principal i ON i.fk_lugar = l.id_lugar
        WHERE (l.fk_categoria = (select fk_categoria from lugares where nombre_lugar = 'Konga Burger Centro')or c.nombre_categoria = 'restaurante-bar') and l.nombre_lugar != 'Konga Burger Centro'
        and (l.fk_ambiente = (SELECT fk_ambiente FROM lugares WHERE nombre_lugar = 'Konga Burger Centro')
        OR l.fk_ambiente2 = (SELECT fk_ambiente FROM lugares WHERE nombre_lugar = 'Konga Burger Centro'))
        order by clicks DESC LIMIT 10;
    
-- CONSULTA PARA VER LAS IMAGENES EXTRA DE UN LUGA POR ID
select * from imagenes_lugares where fk_lugar = 1;
   
    
    
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
