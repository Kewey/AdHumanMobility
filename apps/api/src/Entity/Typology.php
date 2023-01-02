<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Repository\TypologyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: TypologyRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Post(security: "is_granted('ROLE_ADMIN')")
    ],
    normalizationContext: ['groups' => ['typology:read']],
    denormalizationContext: ['groups' => ['typology:create']],
)]
#[ApiFilter(SearchFilter::class, properties: ['label' => 'exact'])]
class Typology
{
    #[Groups(['typology:read'])]
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

    #[Assert\NotBlank]
    #[Groups(['typology:read', 'typology:create'])]
    #[ORM\ManyToOne(targetEntity: MediaObject::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?MediaObject $icon = null;

    #[Groups(['typology:create'])]
    #[ORM\ManyToMany(targetEntity: self::class, inversedBy: 'childrens')]
    #[ORM\JoinTable(name: "typology_parent")]
    #[ORM\JoinColumn(name: "typology_id", referencedColumnName: "id")]
    #[ORM\InverseJoinColumn(name: "parent_id", referencedColumnName: "id")]
    private Collection $parents;

    #[ApiProperty(writableLink: false, readableLink: true)]
    #[MaxDepth(1)]
    #[Groups(['typology:read'])]
    #[ORM\ManyToMany(targetEntity: self::class, mappedBy: 'parents')]
    private Collection $children;

    public function __construct()
    {
        $this->parents = new ArrayCollection();
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

    public function getIcon(): ?MediaObject
    {
        return $this->icon;
    }

    public function setIcon(MediaObject $icon): self
    {
        $this->icon = $icon;

        return $this;
    }

    /**
     * @return Collection|self[]
     */
    public function getChildren(): Collection
    {
        return $this->children;
    }

    public function addChild(self $child): self
    {
        if (!$this->children->contains($child)) {
            $this->children[] = $child;
            $child->addParents($this);
        }

        return $this;
    }

    public function removeChild(self $child): self
    {
        if ($this->children->contains($child)) {
            $this->children->removeElement($child);
            $child->removeParents($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getParents(): Collection
    {
        return $this->parents;
    }

    public function addParents(self $parents): self
    {
        if (!$this->parents->contains($parents)) {
            $this->parents->add($parents);
        }

        return $this;
    }

    public function removeParents(self $parents): self
    {
        $this->parents->removeElement($parents);

        return $this;
    }
}
