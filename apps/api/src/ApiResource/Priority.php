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
            new GetCollection(provider: Priority::class . '::getCases'),
            new Get(provider: Priority::class . '::getCases'),
        ]
    ),
]
enum Priority: string
{
    const CASES = ['low', 'medium', 'high'];

    case LOW = 'low';
    case MEDIUM = 'medium';
    case HIGH = 'high';

    use EnumApiResourceTrait;
}
