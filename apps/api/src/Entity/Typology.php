<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Repository\TypologyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: TypologyRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Post()
    ],
    normalizationContext: ['groups' => ['typology:read']],
    denormalizationContext: ['groups' => ['typology:create']],
)]
class Typology
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['typology:read', 'typology:create'])]
    #[Assert\NotBlank]
    #[ORM\Column(length: 255)]
    private ?string $label = null;

    #[Groups(['typology:read', 'typology:create'])]
    #[ORM\Column(length: 255)]
    private ?string $color = null;

    #[Assert\NotBlank(groups: ['typology:create'])]
    #[Groups(['typology:read', 'typology:create'])]
    #[ORM\ManyToOne(targetEntity: MediaObject::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?MediaObject $file = null;

    #[Groups(['typology:read', 'typology:create'])]
    #[ORM\ManyToMany(targetEntity: self::class, inversedBy: 'typologies')]
    private Collection $parent;

    public function __construct()
    {
        $this->categories = new ArrayCollection();
        $this->parent = new ArrayCollection();
        $this->typologies = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): self
    {
        $this->color = $color;

        return $this;
    }

    public function getFile(): ?File
    {
        return $this->file;
    }

    public function setFile(File $file): self
    {
        $this->file = $file;

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getParent(): Collection
    {
        return $this->parent;
    }

    public function addParent(self $parent): self
    {
        if (!$this->parent->contains($parent)) {
            $this->parent->add($parent);
        }

        return $this;
    }

    public function removeParent(self $parent): self
    {
        $this->parent->removeElement($parent);

        return $this;
    }
}
