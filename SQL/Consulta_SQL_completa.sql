use trailerflix;
SELECT 
    c.id,
    c.poster,
    c.titulo,
    cat.nombre AS categoria,
    -- MIN(g.nombre) AS gen,
    GROUP_CONCAT(DISTINCT g.nombre
        SEPARATOR ', ') AS genero,
    CONCAT(c.titulo,
            ', ',
            cat.nombre,
            ', ',
            GROUP_CONCAT(DISTINCT g.nombre
                ORDER BY g.nombre ASC
                SEPARATOR ', '),
            ', ',
            GROUP_CONCAT(DISTINCT a.nombre
                ORDER BY a.nombre ASC
                SEPARATOR ', ')) AS busqueda,
    c.resumen,
    c.temporadas,
    GROUP_CONCAT(DISTINCT a.nombre
        SEPARATOR ', ') AS reparto,
    c.trailer
FROM
    contenido c
        JOIN
    contenido_actores ca ON c.id = ca.contenido_id
        JOIN
    actores a ON ca.actor_id = a.id
        JOIN
    contenido_generos cg ON c.id = cg.contenido_id
        JOIN
    generos g ON cg.genero_id = g.id
        JOIN
    categorias cat ON cat.id = c.categoria_id
GROUP BY c.id;