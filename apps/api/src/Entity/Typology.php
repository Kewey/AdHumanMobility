<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
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
#[ApiResource(
    uriTemplate: '/typologies/{typologyId}/children',
    uriVariables: [
        'typologyId' => new Link(fromClass: self::class, toProperty: 'parents'),
    ],
    normalizationContext: ['groups' => ['typology:read']],
    operations: [new GetCollection()]
)]
#[ApiFilter(SearchFilter::class, properties: ['label' => 'exact'])]
class Typology
{
    #[Groups(['typology:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['typology:read', 'typology:create', 'disruptions:read'])]
    #[Assert\NotBlank]
    #[ORM\Column(length: 255)]
    private ?string $label = null;

    #[Groups(['typology:read', 'typology:create', 'disruptions:read'])]
    #[ORM\Column(length: 255)]
    private ?string $color = null;

    #[Assert\NotBlank]
    #[Groups(['typology:read', 'typology:create', 'disruptions:read'])]
    #[ORM\ManyToOne(targetEntity: MediaObject::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?MediaObject $icon = null;

    #[Groups(['typology:create'])]
    #[ORM\ManyToMany(targetEntity: self::class, inversedBy: 'childrens')]
    #[ORM\JoinTable(name: "typology_parent")]
    #[ORM\JoinColumn(name: "typology_id", referencedColumnName: "id")]
    #[ORM\InverseJoinColumn(name: "parent_id", referencedColumnName: "id")]
    private Collection $parents;

    #[MaxDepth(1)]
    #[Groups(['typology:read'])]
    #[ApiProperty(writableLink: false, readableLink: true)]
    #[ORM\ManyToMany(targetEntity: self::class, mappedBy: 'parents')]
    private Collection $children;

    #[ORM\OneToMany(mappedBy: 'typology', targetEntity: Disruption::class)]
    private Collection $disruptions;

    #[ORM\OneToMany(mappedBy: 'category', targetEntity: Disruption::class)]
    private Collection $categoryDisruptions;

    #[ORM\OneToMany(mappedBy: 'subCategory', targetEntity: Disruption::class)]
    private Collection $subCategoryDisruptions;

    public function __construct()
    {
        $this->parents = new ArrayCollection();
        $this->disruptions = new ArrayCollection();
        $this->categoryDisruptions = new ArrayCollection();
        $this->subCategoryDisruptions = new ArrayCollection();
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

    /**
     * @return Collection<int, Disruption>
     */
    public function getDisruptions(): Collection
    {
        return $this->disruptions;
    }

    public function addDisruption(Disruption $disruption): self
    {
        if (!$this->disruptions->contains($disruption)) {
            $this->disruptions->add($disruption);
            $disruption->setTypology($this);
        }

        return $this;
    }

    public function removeDisruption(Disruption $disruption): self
    {
        if ($this->disruptions->removeElement($disruption)) {
            // set the owning side to null (unless already changed)
            if ($disruption->getTypology() === $this) {
                $disruption->setTypology(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Disruption>
     */
    public function getCategoryDisruptions(): Collection
    {
        return $this->categoryDisruptions;
    }

    public function addCategoryDisruption(Disruption $categoryDisruption): self
    {
        if (!$this->categoryDisruptions->contains($categoryDisruption)) {
            $this->categoryDisruptions->add($categoryDisruption);
            $categoryDisruption->setCategory($this);
        }

        return $this;
    }

    public function removeCategoryDisruption(Disruption $categoryDisruption): self
    {
        if ($this->categoryDisruptions->removeElement($categoryDisruption)) {
            // set the owning side to null (unless already changed)
            if ($categoryDisruption->getCategory() === $this) {
                $categoryDisruption->setCategory(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Disruption>
     */
    public function getSubCategoryDisruptions(): Collection
    {
        return $this->subCategoryDisruptions;
    }

    public function addSubCategoryDisruption(Disruption $subCategoryDisruption): self
    {
        if (!$this->subCategoryDisruptions->contains($subCategoryDisruption)) {
            $this->subCategoryDisruptions->add($subCategoryDisruption);
            $subCategoryDisruption->setSubCategory($this);
        }

        return $this;
    }

    public function removeSubCategoryDisruption(Disruption $subCategoryDisruption): self
    {
        if ($this->subCategoryDisruptions->removeElement($subCategoryDisruption)) {
            // set the owning side to null (unless already changed)
            if ($subCategoryDisruption->getSubCategory() === $this) {
                $subCategoryDisruption->setSubCategory(null);
            }
        }

        return $this;
    }
}
