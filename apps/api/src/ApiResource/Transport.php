<?php

namespace App\ApiResource;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;

#[
    ApiResource(
        types: ['https://schema.org/Enumeration'],
        normalizationContext: ['groups' => ['enumeration:read']],
        operations: [
            new GetCollection(provider: Transport::class . '::getCases'),
            new Get(provider: Transport::class . '::getCases'),
        ]
    ),
]
enum Transport: string
{
    const CASES = ['walker', 'bike', 'scooter', 'car', 'truck'];

    case WALKER = 'walker';
    case BIKE = 'bike';
    case SCOOTER = 'scooter';
    case CAR = 'car';
    case TRUCK = 'truck';

    use EnumApiResourceTrait;
}
