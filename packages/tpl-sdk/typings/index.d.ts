declare class SDK {
  constructor(opts?: Options);

  base: string;
  token: string | (() => string);
  auth: string;

  pet: PetAPI;
}

declare global {
  export interface Options {
    base?: string;
    token?: string | (() => string);
  }

  export interface PetAPI {
    /**
     * List all pets
     */
    listPets(req: ListPetsRequest): Promise<ListPetsResponse>;
    /**
     * Create a pet
     */
    createPet(req: CreatePetRequest): Promise<CreatePetResponse>;
    /**
     * Find pet by id
     */
    showPetById(req: ShowPetByIdRequest): Promise<ShowPetByIdResponse>;
    /**
     * Update pet
     */
    updatePet(req: UpdatePetRequest): Promise<UpdatePetResponse>;
    /**
     *
     */
    deletePet(req: DeletePetRequest): Promise<DeletePetResponse>;
  }

  export interface ListPetsRequest {
    query?: {
      _limit?: number;
      _offset?: number;
      _sort?: string;
      _select?: string[];
      tag?: string;
      age_gt?: number;
      birthAt_gt?: string;
      birthAt_lt?: string;
      grade_gt?: string;
      grade_lt?: string;
    };
  }
  export interface ListPetsResponse {
    content?: ({
      /**
       * pet's name
       */
      name?: string;
      tag?: "DOG" | "CAT";
      age?: number;
      birthAt?: string;
      grade?: number;
      owner?: string;
      other1?: string;
    } & {
      id: string;
      updateAt?: Date;
      updateBy?: string;
      createAt?: Date;
      createBy?: string;
    })[];
    headers?: {
      "X-Total-Count": number;
    };
  }
  export interface CreatePetRequest {
    body: {
      /**
       * pet's name
       */
      name?: string;
      tag?: "DOG" | "CAT";
      age?: number;
      birthAt?: string;
      grade?: number;
      owner?: string;
      other2?: string;
    } & {
      /**
       * pet's name
       */
      name: string;
    };
  }
  export interface CreatePetResponse {
    content?: {
      /**
       * pet's name
       */
      name?: string;
      tag?: "DOG" | "CAT";
      age?: number;
      birthAt?: string;
      grade?: number;
      owner?: string;
      other1?: string;
    } & {
      id: string;
      updateAt?: Date;
      updateBy?: string;
      createAt?: Date;
      createBy?: string;
    };
  }
  export interface ShowPetByIdRequest {
    petId: string;
  }
  export interface ShowPetByIdResponse {
    content?: {
      /**
       * pet's name
       */
      name?: string;
      tag?: "DOG" | "CAT";
      age?: number;
      birthAt?: string;
      grade?: number;
      owner?: string;
      other1?: string;
    } & {
      id: string;
      updateAt?: Date;
      updateBy?: string;
      createAt?: Date;
      createBy?: string;
    };
  }
  export interface UpdatePetRequest {
    petId: string;
    body: {
      /**
       * pet's name
       */
      name?: string;
      tag?: "DOG" | "CAT";
      age?: number;
      birthAt?: string;
      grade?: number;
      owner?: string;
      other2?: string;
    };
  }
  export interface UpdatePetResponse {
    content?: {
      /**
       * pet's name
       */
      name?: string;
      tag?: "DOG" | "CAT";
      age?: number;
      birthAt?: string;
      grade?: number;
      owner?: string;
      other1?: string;
    } & {
      id: string;
      updateAt?: Date;
      updateBy?: string;
      createAt?: Date;
      createBy?: string;
    };
  }
  export interface DeletePetRequest {
    petId: string;
  }
}

export = SDK;
