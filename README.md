# Ejercicio Alquiler de Bicicletas

## Objetivos
- Implementar nuevas funciones de lógica de dominio
- Codificar test unitarios en paralelo a la implementación
- Usar buenas prácticas de codificacion
- Modificar la interfaz de usuario para usar las nuevas funciones

### Aspectos a tener en cuenta
- Los comentarios `// TODO` deben ser reemplazados por código para implementar las nuevas funciones.
- Puede agregar nuevas funciones y tests, así como agregar parámetros en funciones existentes.
- Si necesita realizar supuestos sobre la implementación, agregue comentarios para explicarlos.
- Los test unitarios se deben codificar en los archivos correspondientes `*.test.ts`.
- La cobertura de los test unitarios debe alcanzar 100 % de sentencias y ramas.
- Ejecute el linter con `npm run lint` para eliminar errores y warnings.
- Verifique que `npm run build` no muestre errores de TypeScript.

> Recuerde al finalizar cada parte:
> - realizar commit / push
> - subir un issue con screenshots

### Parte A
1. En la clase `Rental` implementar el campo `lateHours`, las horas de atraso en la devolución: entero mayor o igual a 0, con valor 0 por defecto. Modificar `toString()` para que, solo cuando las horas de atraso sean mayores que 0, las muestre (por ejemplo: `Atraso: 2 h`). Codificar tests, incluyendo casos de error.
2. En la clase `RentalList` implementar `totalLateFees()`, que devuelve la suma de los recargos por atraso. Cada hora de atraso se cobra al doble del precio por hora. Por ejemplo, un alquiler de 100 por hora con 2 horas de atraso tiene un recargo de 400. El recargo no modifica `cost()` ni `totalIncome()`. Codificar sus tests.
3. En la clase `RentalList` implementar `remove(bikeCode)`, que elimina el alquiler de esa bicicleta y lanza un `Error` si no existe. Codificar sus tests.

Subir un issue 'Parte A' con screenshot de la terminal con el resumen de tests y cobertura.

### Parte B
4. Agregar un campo "Horas de atraso" en el formulario del panel "Nuevo alquiler" y un total "Recargos por atraso" en el panel "Inicio". Si el campo se deja vacío, las horas de atraso son 0.
5. Usar el componente badge de Bootstrap para mostrar el tipo de bicicleta en la card de cada alquiler, en lugar de mostrarlo en el contenido de la card.
6. Completar el `// TODO` de `createDeleteButton` en `main.ts` para que el botón "Eliminar" de cada card elimine el alquiler y actualice los paneles "Alquileres" y "Por tipo" y los totales.

Subir un issue 'Parte B' con screenshot de la página (paneles Inicio y Alquileres).

### Referencias y recursos útiles

- [ESLint](https://eslint.org/docs/latest/rules/)
- [Prettier](https://prettier.io/docs/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Vitest](https://vitest.dev/guide/)
- [Bootstrap](https://getbootstrap.com/docs/4.1/getting-started/introduction/)
- [HTML](https://www.w3schools.com/html/)

