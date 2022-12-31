<?php

namespace App\Entity;

use App\Repository\TypologyCategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TypologyCategoryRepository::class)]
class TypologyCategory extends Typology
{
    #[ORM\ManyToMany(targetEntity: Typology::class, inversedBy: 'categories')]
    private Collection $parent;

    public function __construct()
    {
        $this->parent = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Typology>
     */
    public function getParent(): Collection
    {
        return $this->parent;
    }

    public function addParent(Typology $parent): self
    {
        if (!$this->parent->contains($parent)) {
            $this->parent->add($parent);
        }

        return $this;
    }

    public function removeParent(Typology $parent): self
    {
        $this->parent->removeElement($parent);

        return $this;
    }
}
