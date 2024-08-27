export async function up(db, client) {
    const services = [
        {
            name: "READ_ACCESS",
            createService: false,
            readService: true,
            updateService: false,
            deleteService: false
        },
        {
            name: "FULL_ACCESS",
            createService: true,
            readService: true,
            updateService: true,
            deleteService: true
        },
        {
            name: "MODERATE_ACCESS",
            createService: true,
            readService: true,
            updateService: true,
            deleteService: false
        },
        {
            name: "LIMITED_ACCESS",
            createService: false,
            readService: true,
            updateService: true,
            deleteService: false
        }
    ];

    await db.collection('permissions').insertMany(services);
}

export async function down(db, client) {
    await db.collection('permissions').deleteMany({});
}