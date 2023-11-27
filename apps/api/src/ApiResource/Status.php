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
            new GetCollection(provider: Status::class . '::getCases'),
            new Get(provider: Status::class . '::getCases'),
        ]
    ),
]
enum Status: string
{
    const CASES = ['draft', 'published', 'archived'];

    case DRAFT = 'draft';
    case PUBLISHED = 'published';
    case ARCHIVED = 'archived';

    use EnumApiResourceTrait;
}
