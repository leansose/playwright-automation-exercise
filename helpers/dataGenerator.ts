import { faker } from '@faker-js/faker';

export function generateRandomUser() {

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;

    const emailName = fullName
        .toLowerCase().
        replace(/\s+/g, '.');
    const email = `${emailName}@${faker.internet.domainName()}`;

    return {
        user: {
            name: fullName,
            email: email
        },
        account: generateRandomAccountInfo(),
        address: generateRandomAddressInfo(firstName, lastName)
    };
}

function generateRandomAccountInfo() {

    const birthDate = faker.date.between({ from: '1920-01-01', to: '2008-12-31' });
    const day = birthDate.getDate().toString();

    const MONTHS = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = MONTHS[birthDate.getMonth()];

    const year = birthDate.getFullYear().toString();

    return {
        password: faker.internet.password(),
        month: month,
        day: day,
        year: year
    };
}

function generateRandomAddressInfo(firstName: string, lastName: string) {

    const COUNTRIES = ['India', 'United States', 'Canada', 'Australia', 'Israel', 'New Zealand', 'Singapore'];
   
    return {
        firstName: firstName,
        lastName: lastName,
        company: faker.company.name(),
        address: faker.location.streetAddress(false),
        address2: faker.location.buildingNumber(),
        country: faker.helpers.arrayElement(COUNTRIES),
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        mobileNumber: faker.phone.number()
    };
}


