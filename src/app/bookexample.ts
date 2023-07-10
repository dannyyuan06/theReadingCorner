
export type Book = {
    kind:       string;
    id:         string;
    etag:       string;
    selfLink:   string;
    volumeInfo: VolumeInfo;
    saleInfo:   SaleInfo;
    accessInfo: AccessInfo;
}

export type AccessInfo = {
    country:                string;
    viewability:            string;
    embeddable:             boolean;
    publicDomain:           boolean;
    textToSpeechPermission: string;
    epub:                   Epub;
    pdf:                    PDF;
    accessViewStatus:       string;
}

export type Epub = {
    isAvailable:  boolean;
    acsTokenLink: string;
}

export type PDF = {
    isAvailable: boolean;
}

export type SaleInfo = {
    country:     string;
    saleability: string;
    isEbook:     boolean;
    listPrice:   Price;
    retailPrice: Price;
    buyLink:     string;
}

export type Price = {
    amount:       number;
    currencyCode: string;
}

export type VolumeInfo = {
    title:               string;
    authors:             string[];
    publisher:           string;
    publishedDate:       string;
    description:         string;
    industryIdentifiers: IndustryIdentifier[];
    pageCount:           number;
    dimensions:          Dimensions;
    printType:           string;
    mainCategory:        string;
    categories:          string[];
    averageRating:       number;
    ratingsCount:        number;
    contentVersion:      string;
    imageLinks:          ImageLinks;
    language:            string;
    infoLink:            string;
    canonicalVolumeLink: string;
}

export type Dimensions = {
    height:    string;
    width:     string;
    thickness: string;
}

export type ImageLinks = {
    smallThumbnail: string;
    thumbnail:      string;
    small:          string;
    medium:         string;
    large:          string;
    extraLarge:     string;
}

export type IndustryIdentifier = {
    type:       string;
    identifier: string;
}

export const bookexample: {[id: string]: Book} = {
    1: {
      kind: "books#volume",
      id: "zyTCAlFPjgYC",
      etag: "f0zKg75Mx/I",
      selfLink: "https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC",
      volumeInfo: {
        title: "The Google story",
        authors: [
          "David A. Vise",
          "Mark Malseed"
        ],
        publisher: "Random House Digital, Inc.",
        publishedDate: "2005-11-15",
        description: "\"Here is the story behind one of the most remarkable Internet successes of our time. Based on scrupulous research and extraordinary access to Google, ...",
        industryIdentifiers: [
          {
            type: "ISBN_10",
            identifier: "055380457X"
          },
          {
            type: "ISBN_13",
            identifier: "9780553804577"
          }
        ],
        pageCount: 207,
        dimensions: {
          height: "24.00 cm",
          width: "16.03 cm",
          thickness: "2.74 cm"
        },
        printType: "BOOK",
        mainCategory: "Business & Economics / Entrepreneurship",
        categories: [
          "Browsers (Computer programs)"
        ],
        averageRating: 3.5,
        ratingsCount: 136,
        contentVersion: "1.1.0.0.preview.2",
        imageLinks: {
          smallThumbnail: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          small: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api",
          medium: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=3&edge=curl&source=gbs_api",
          large: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=4&edge=curl&source=gbs_api",
          extraLarge: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=6&edge=curl&source=gbs_api"
        },
        language: "en",
        infoLink: "https://books.google.com/books?id=zyTCAlFPjgYC&ie=ISO-8859-1&source=gbs_api",
        canonicalVolumeLink: "https://books.google.com/books/about/The_Google_story.html?id=zyTCAlFPjgYC"
      },
      saleInfo: {
        country: "US",
        saleability: "FOR_SALE",
        isEbook: true,
        listPrice: {
          amount: 11.99,
          currencyCode: "USD"
        },
        retailPrice: {
          amount: 11.99,
          currencyCode: "USD"
        },
        buyLink: "https://books.google.com/books?id=zyTCAlFPjgYC&ie=ISO-8859-1&buy=&source=gbs_api"
      },
      accessInfo: {
        country: "US",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED_FOR_ACCESSIBILITY",
        epub: {
          isAvailable: true,
          acsTokenLink: "https://books.google.com/books/download/The_Google_story-sample-epub.acsm?id=zyTCAlFPjgYC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
        },
        pdf: {
          isAvailable: false
        },
        accessViewStatus: "SAMPLE"
      }
    },
    2: {
      kind: "books#volume",
      id: "zyTCAlFPjgYC",
      etag: "f0zKg75Mx/I",
      selfLink: "https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC",
      volumeInfo: {
        title: "The Google story 1",
        authors: [
          "David A. Vise",
          "Mark Malseed"
        ],
        publisher: "Random House Digital, Inc.",
        publishedDate: "2005-11-15",
        description: "\"Here is the story behind one of the most remarkable Internet successes of our time. Based on scrupulous research and extraordinary access to Google, ...",
        industryIdentifiers: [
          {
            type: "ISBN_10",
            identifier: "055380457X"
          },
          {
            type: "ISBN_13",
            identifier: "9780553804577"
          }
        ],
        pageCount: 207,
        dimensions: {
          height: "24.00 cm",
          width: "16.03 cm",
          thickness: "2.74 cm"
        },
        printType: "BOOK",
        mainCategory: "Business & Economics / Entrepreneurship",
        categories: [
          "Browsers (Computer programs)"
        ],
        averageRating: 3.5,
        ratingsCount: 136,
        contentVersion: "1.1.0.0.preview.2",
        imageLinks: {
          smallThumbnail: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          small: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api",
          medium: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=3&edge=curl&source=gbs_api",
          large: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=4&edge=curl&source=gbs_api",
          extraLarge: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=6&edge=curl&source=gbs_api"
        },
        language: "en",
        infoLink: "https://books.google.com/books?id=zyTCAlFPjgYC&ie=ISO-8859-1&source=gbs_api",
        canonicalVolumeLink: "https://books.google.com/books/about/The_Google_story.html?id=zyTCAlFPjgYC"
      },
      saleInfo: {
        country: "US",
        saleability: "FOR_SALE",
        isEbook: true,
        listPrice: {
          amount: 11.99,
          currencyCode: "USD"
        },
        retailPrice: {
          amount: 11.99,
          currencyCode: "USD"
        },
        buyLink: "https://books.google.com/books?id=zyTCAlFPjgYC&ie=ISO-8859-1&buy=&source=gbs_api"
      },
      accessInfo: {
        country: "US",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED_FOR_ACCESSIBILITY",
        epub: {
          isAvailable: true,
          acsTokenLink: "https://books.google.com/books/download/The_Google_story-sample-epub.acsm?id=zyTCAlFPjgYC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
        },
        pdf: {
          isAvailable: false
        },
        accessViewStatus: "SAMPLE"
      }
    },
    3: {
      kind: "books#volume",
      id: "zyTCAlFPjgYC",
      etag: "f0zKg75Mx/I",
      selfLink: "https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC",
      volumeInfo: {
        title: "The Google story 2",
        authors: [
          "David A. Vise",
          "Mark Malseed"
        ],
        publisher: "Random House Digital, Inc.",
        publishedDate: "2005-11-15",
        description: "\"Here is the story behind one of the most remarkable Internet successes of our time. Based on scrupulous research and extraordinary access to Google, ...",
        industryIdentifiers: [
          {
            type: "ISBN_10",
            identifier: "055380457X"
          },
          {
            type: "ISBN_13",
            identifier: "9780553804577"
          }
        ],
        pageCount: 207,
        dimensions: {
          height: "24.00 cm",
          width: "16.03 cm",
          thickness: "2.74 cm"
        },
        printType: "BOOK",
        mainCategory: "Business & Economics / Entrepreneurship",
        categories: [
          "Browsers (Computer programs)"
        ],
        averageRating: 3.5,
        ratingsCount: 136,
        contentVersion: "1.1.0.0.preview.2",
        imageLinks: {
          smallThumbnail: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          small: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api",
          medium: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=3&edge=curl&source=gbs_api",
          large: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=4&edge=curl&source=gbs_api",
          extraLarge: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=6&edge=curl&source=gbs_api"
        },
        language: "en",
        infoLink: "https://books.google.com/books?id=zyTCAlFPjgYC&ie=ISO-8859-1&source=gbs_api",
        canonicalVolumeLink: "https://books.google.com/books/about/The_Google_story.html?id=zyTCAlFPjgYC"
      },
      saleInfo: {
        country: "US",
        saleability: "FOR_SALE",
        isEbook: true,
        listPrice: {
          amount: 11.99,
          currencyCode: "USD"
        },
        retailPrice: {
          amount: 11.99,
          currencyCode: "USD"
        },
        buyLink: "https://books.google.com/books?id=zyTCAlFPjgYC&ie=ISO-8859-1&buy=&source=gbs_api"
      },
      accessInfo: {
        country: "US",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED_FOR_ACCESSIBILITY",
        epub: {
          isAvailable: true,
          acsTokenLink: "https://books.google.com/books/download/The_Google_story-sample-epub.acsm?id=zyTCAlFPjgYC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
        },
        pdf: {
          isAvailable: false
        },
        accessViewStatus: "SAMPLE"
      }
    },
    4: {
      kind: "books#volume",
      id: "zyTCAlFPjgYC",
      etag: "f0zKg75Mx/I",
      selfLink: "https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC",
      volumeInfo: {
        title: "The Google story 3",
        authors: [
          "David A. Vise",
          "Mark Malseed"
        ],
        publisher: "Random House Digital, Inc.",
        publishedDate: "2005-11-15",
        description: "\"Here is the story behind one of the most remarkable Internet successes of our time. Based on scrupulous research and extraordinary access to Google, ...",
        industryIdentifiers: [
          {
            type: "ISBN_10",
            identifier: "055380457X"
          },
          {
            type: "ISBN_13",
            identifier: "9780553804577"
          }
        ],
        pageCount: 207,
        dimensions: {
          height: "24.00 cm",
          width: "16.03 cm",
          thickness: "2.74 cm"
        },
        printType: "BOOK",
        mainCategory: "Business & Economics / Entrepreneurship",
        categories: [
          "Browsers (Computer programs)"
        ],
        averageRating: 3.5,
        ratingsCount: 136,
        contentVersion: "1.1.0.0.preview.2",
        imageLinks: {
          smallThumbnail: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          small: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api",
          medium: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=3&edge=curl&source=gbs_api",
          large: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=4&edge=curl&source=gbs_api",
          extraLarge: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=6&edge=curl&source=gbs_api"
        },
        language: "en",
        infoLink: "https://books.google.com/books?id=zyTCAlFPjgYC&ie=ISO-8859-1&source=gbs_api",
        canonicalVolumeLink: "https://books.google.com/books/about/The_Google_story.html?id=zyTCAlFPjgYC"
      },
      saleInfo: {
        country: "US",
        saleability: "FOR_SALE",
        isEbook: true,
        listPrice: {
          amount: 11.99,
          currencyCode: "USD"
        },
        retailPrice: {
          amount: 11.99,
          currencyCode: "USD"
        },
        buyLink: "https://books.google.com/books?id=zyTCAlFPjgYC&ie=ISO-8859-1&buy=&source=gbs_api"
      },
      accessInfo: {
        country: "US",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED_FOR_ACCESSIBILITY",
        epub: {
          isAvailable: true,
          acsTokenLink: "https://books.google.com/books/download/The_Google_story-sample-epub.acsm?id=zyTCAlFPjgYC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
        },
        pdf: {
          isAvailable: false
        },
        accessViewStatus: "SAMPLE"
      }
    },
    5: {
      kind: "books#volume",
      id: "zyTCAlFPjgYC",
      etag: "f0zKg75Mx/I",
      selfLink: "https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC",
      volumeInfo: {
        title: "The Google story 4",
        authors: [
          "David A. Vise",
          "Mark Malseed"
        ],
        publisher: "Random House Digital, Inc.",
        publishedDate: "2005-11-15",
        description: "\"Here is the story behind one of the most remarkable Internet successes of our time. Based on scrupulous research and extraordinary access to Google, ...",
        industryIdentifiers: [
          {
            type: "ISBN_10",
            identifier: "055380457X"
          },
          {
            type: "ISBN_13",
            identifier: "9780553804577"
          }
        ],
        pageCount: 207,
        dimensions: {
          height: "24.00 cm",
          width: "16.03 cm",
          thickness: "2.74 cm"
        },
        printType: "BOOK",
        mainCategory: "Business & Economics / Entrepreneurship",
        categories: [
          "Browsers (Computer programs)"
        ],
        averageRating: 3.5,
        ratingsCount: 136,
        contentVersion: "1.1.0.0.preview.2",
        imageLinks: {
          smallThumbnail: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          small: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api",
          medium: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=3&edge=curl&source=gbs_api",
          large: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=4&edge=curl&source=gbs_api",
          extraLarge: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=6&edge=curl&source=gbs_api"
        },
        language: "en",
        infoLink: "https://books.google.com/books?id=zyTCAlFPjgYC&ie=ISO-8859-1&source=gbs_api",
        canonicalVolumeLink: "https://books.google.com/books/about/The_Google_story.html?id=zyTCAlFPjgYC"
      },
      saleInfo: {
        country: "US",
        saleability: "FOR_SALE",
        isEbook: true,
        listPrice: {
          amount: 11.99,
          currencyCode: "USD"
        },
        retailPrice: {
          amount: 11.99,
          currencyCode: "USD"
        },
        buyLink: "https://books.google.com/books?id=zyTCAlFPjgYC&ie=ISO-8859-1&buy=&source=gbs_api"
      },
      accessInfo: {
        country: "US",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED_FOR_ACCESSIBILITY",
        epub: {
          isAvailable: true,
          acsTokenLink: "https://books.google.com/books/download/The_Google_story-sample-epub.acsm?id=zyTCAlFPjgYC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
        },
        pdf: {
          isAvailable: false
        },
        accessViewStatus: "SAMPLE"
      }
    },
    6: {
      kind: "books#volume",
      id: "zyTCAlFPjgYC",
      etag: "f0zKg75Mx/I",
      selfLink: "https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC",
      volumeInfo: {
        title: "The Google story 5",
        authors: [
          "David A. Vise",
          "Mark Malseed"
        ],
        publisher: "Random House Digital, Inc.",
        publishedDate: "2005-11-15",
        description: "\"Here is the story behind one of the most remarkable Internet successes of our time. Based on scrupulous research and extraordinary access to Google, ...",
        industryIdentifiers: [
          {
            type: "ISBN_10",
            identifier: "055380457X"
          },
          {
            type: "ISBN_13",
            identifier: "9780553804577"
          }
        ],
        pageCount: 207,
        dimensions: {
          height: "24.00 cm",
          width: "16.03 cm",
          thickness: "2.74 cm"
        },
        printType: "BOOK",
        mainCategory: "Business & Economics / Entrepreneurship",
        categories: [
          "Browsers (Computer programs)"
        ],
        averageRating: 3.5,
        ratingsCount: 136,
        contentVersion: "1.1.0.0.preview.2",
        imageLinks: {
          smallThumbnail: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          small: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api",
          medium: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=3&edge=curl&source=gbs_api",
          large: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=4&edge=curl&source=gbs_api",
          extraLarge: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=6&edge=curl&source=gbs_api"
        },
        language: "en",
        infoLink: "https://books.google.com/books?id=zyTCAlFPjgYC&ie=ISO-8859-1&source=gbs_api",
        canonicalVolumeLink: "https://books.google.com/books/about/The_Google_story.html?id=zyTCAlFPjgYC"
      },
      saleInfo: {
        country: "US",
        saleability: "FOR_SALE",
        isEbook: true,
        listPrice: {
          amount: 11.99,
          currencyCode: "USD"
        },
        retailPrice: {
          amount: 11.99,
          currencyCode: "USD"
        },
        buyLink: "https://books.google.com/books?id=zyTCAlFPjgYC&ie=ISO-8859-1&buy=&source=gbs_api"
      },
      accessInfo: {
        country: "US",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED_FOR_ACCESSIBILITY",
        epub: {
          isAvailable: true,
          acsTokenLink: "https://books.google.com/books/download/The_Google_story-sample-epub.acsm?id=zyTCAlFPjgYC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
        },
        pdf: {
          isAvailable: false
        },
        accessViewStatus: "SAMPLE"
      }
    },
    7: {
      kind: "books#volume",
      id: "zyTCAlFPjgYC",
      etag: "f0zKg75Mx/I",
      selfLink: "https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC",
      volumeInfo: {
        title: "The Google story 6",
        authors: [
          "David A. Vise",
          "Mark Malseed"
        ],
        publisher: "Random House Digital, Inc.",
        publishedDate: "2005-11-15",
        description: "\"Here is the story behind one of the most remarkable Internet successes of our time. Based on scrupulous research and extraordinary access to Google, ...",
        industryIdentifiers: [
          {
            type: "ISBN_10",
            identifier: "055380457X"
          },
          {
            type: "ISBN_13",
            identifier: "9780553804577"
          }
        ],
        pageCount: 207,
        dimensions: {
          height: "24.00 cm",
          width: "16.03 cm",
          thickness: "2.74 cm"
        },
        printType: "BOOK",
        mainCategory: "Business & Economics / Entrepreneurship",
        categories: [
          "Browsers (Computer programs)"
        ],
        averageRating: 3.5,
        ratingsCount: 136,
        contentVersion: "1.1.0.0.preview.2",
        imageLinks: {
          smallThumbnail: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          small: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api",
          medium: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=3&edge=curl&source=gbs_api",
          large: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=4&edge=curl&source=gbs_api",
          extraLarge: "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=6&edge=curl&source=gbs_api"
        },
        language: "en",
        infoLink: "https://books.google.com/books?id=zyTCAlFPjgYC&ie=ISO-8859-1&source=gbs_api",
        canonicalVolumeLink: "https://books.google.com/books/about/The_Google_story.html?id=zyTCAlFPjgYC"
      },
      saleInfo: {
        country: "US",
        saleability: "FOR_SALE",
        isEbook: true,
        listPrice: {
          amount: 11.99,
          currencyCode: "USD"
        },
        retailPrice: {
          amount: 11.99,
          currencyCode: "USD"
        },
        buyLink: "https://books.google.com/books?id=zyTCAlFPjgYC&ie=ISO-8859-1&buy=&source=gbs_api"
      },
      accessInfo: {
        country: "US",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED_FOR_ACCESSIBILITY",
        epub: {
          isAvailable: true,
          acsTokenLink: "https://books.google.com/books/download/The_Google_story-sample-epub.acsm?id=zyTCAlFPjgYC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
        },
        pdf: {
          isAvailable: false
        },
        accessViewStatus: "SAMPLE"
      }
    }
  }