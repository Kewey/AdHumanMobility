<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use App\Repository\DisruptionRepository;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\ApiResource\Priority;
use App\ApiResource\Transport;
use DateTime;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation\Uploadable;
use Vich\UploaderBundle\Mapping\Annotation\UploadableField;
use Gedmo\Mapping\Annotation as Gedmo;

#[Uploadable]
#[ApiResource(
    normalizationContext: ['groups' => ['disruptions:read', 'media_object:read']],
    denormalizationContext: ['groups' => ['disruptions:write']],
    operations: [
        new GetCollection(),
        new Post(
            security: "is_granted('ROLE_USER')",
            inputFormats: ['multipart' => ['multipart/form-data']]
        ),
        new Get(),
        new Put(security: "is_granted('ROLE_ADMIN') or object.author == user"),
        new Delete(security: "is_granted('ROLE_ADMIN') or object.author == user"),
    ]
)]
#[ApiResource(
    uriTemplate: '/users/{userId}/disruptions',
    uriVariables: [
        'userId' => new Link(fromClass: User::class, toProperty: 'author'),
    ],
    normalizationContext: ['groups' => ['disruptions:read']],
    operations: [new GetCollection()]
)]
#[ApiResource(
    uriTemplate: '/typologies/{typologyId}/disruptions',
    uriVariables: [
        'typologyId' => new Link(fromClass: Typology::class, toProperty: 'typology'),
    ],
    normalizationContext: ['groups' => ['disruptions:read']],
    operations: [new GetCollection()]
)]
#[ApiResource(
    uriTemplate: '/category/{categoryId}/disruptions',
    uriVariables: [
        'categoryId' => new Link(fromClass: Typology::class, toProperty: 'category'),
    ],
    normalizationContext: ['groups' => ['disruptions:read']],
    operations: [new GetCollection()]
)]
#[ApiResource(
    uriTemplate: '/subCategory/{subCategoryId}/disruptions',
    uriVariables: [
        'subCategoryId' => new Link(fromClass: Typology::class, toProperty: 'subCategory'),
    ],
    normalizationContext: ['groups' => ['disruptions:read']],
    operations: [new GetCollection()]
)]
#[ORM\Entity(repositoryClass: DisruptionRepository::class)]
class Disruption
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['disruptions:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'disruptions')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['disruptions:read'])]
    private ?User $author = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotNull]
    #[ApiProperty(
        openapiContext: [
            'type' => 'string',
            'enum' => [
                Transport::CASES,
            ],
            'example' => Transport::WALKER->value
        ]
    )]
    #[Groups(['disruptions:write', 'disruptions:read'])]
    private ?string $transportType = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Assert\NotNull]
    #[Groups(['disruptions:write', 'disruptions:read'])]
    private ?string $content = null;

    #[ORM\Column]
    #[Assert\NotNull]
    #[Groups(['disruptions:write', 'disruptions:read'])]
    private ?string $lat = null;

    #[ORM\Column]
    #[Assert\NotNull]
    #[Groups(['disruptions:write', 'disruptions:read'])]
    private ?string $long = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotNull]
    #[ApiProperty(
        openapiContext: [
            'type' => 'string',
            'enum' => [Priority::CASES],
            'example' => Priority::LOW->value
        ]
    )]
    #[Groups(['disruptions:write'])]
    private ?string $priority = null;

    #[ApiProperty(types: ['https://schema.org/contentUrl'])]
    #[Groups(['disruptions:read'])]
    public ?string $contentUrl = null;

    #[UploadableField(mapping: "media_object", fileNameProperty: "evidencesPath")]
    #[Groups(['disruptions:write'])]
    public ?File $file = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['disruptions:read'])]
    public ?string $evidencesPath = null;

    #[ORM\Column]
    #[Gedmo\Timestampable(on: 'create')]
    #[Groups(['user:read'])]
    private ?\DateTime $createdAt = null;

    #[ORM\Column]
    #[Gedmo\Timestampable]
    #[Groups(['user:read'])]
    private ?\DateTime $updatedAt = null;

    #[ORM\ManyToOne(inversedBy: 'disruptions')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['disruptions:read'])]
    private ?Typology $typology = null;

    #[ORM\ManyToOne(inversedBy: 'categoryDisruptions')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['disruptions:read'])]
    private ?Typology $category = null;

    #[ORM\ManyToOne(inversedBy: 'subCategoryDisruptions')]
    #[Groups(['disruptions:read'])]
    private ?Typology $subCategory = null;

    public function __construct()
    {
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
    {
        $this->author = $author;

        return $this;
    }

    public function getTransportType(): ?string
    {
        return $this->transportType;
    }

    public function setTransportType(string $transportType): self
    {
        $this->transportType = $transportType;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getLat(): ?string
    {
        return $this->lat;
    }

    public function setLat(string $lat): self
    {
        $this->lat = $lat;

        return $this;
    }

    public function getLong(): ?string
    {
        return $this->long;
    }

    public function setLong(string $long): self
    {
        $this->long = $long;

        return $this;
    }

    public function getPriority(): ?string
    {
        return $this->priority;
    }

    public function setPriority(string $priority): self
    {
        $this->priority = $priority;

        return $this;
    }

    public function getCreatedAt(): ?\DateTime
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTime $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTime
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTime $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getTypology(): ?typology
    {
        return $this->typology;
    }

    public function setTypology(?typology $typology): self
    {
        $this->typology = $typology;

        return $this;
    }

    public function getCategory(): ?Typology
    {
        return $this->category;
    }

    public function setCategory(?Typology $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getSubCategory(): ?Typology
    {
        return $this->subCategory;
    }

    public function setSubCategory(?Typology $subCategory): self
    {
        $this->subCategory = $subCategory;

        return $this;
    }
}
