
export class UserModel {

    public Id: number;
    public Name: string;
    public Username: string;
    public Email: string;
    public Address: Address;
    public Phone: string;
    public Website: string;
    public Company: Company;
}

export class Geo {
    public Lat: string;
    public Lng: string;
}

export class Address {
    public Street: string;
    public Suite: string;
    public City: string;
    public Zipcode: string;
    public Geo: Geo;
}

export class Company {
    public Name: string;
    public CatchPhrase: string;
    public Bs: string;
}
