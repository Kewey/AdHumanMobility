<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221231023217 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE typology_category (id INT NOT NULL, label VARCHAR(255) NOT NULL, color VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE typology_category_typology (typology_category_id INT NOT NULL, typology_id INT NOT NULL, PRIMARY KEY(typology_category_id, typology_id))');
        $this->addSql('CREATE INDEX IDX_816F5C6E3FF28553 ON typology_category_typology (typology_category_id)');
        $this->addSql('CREATE INDEX IDX_816F5C6EC7D98C7A ON typology_category_typology (typology_id)');
        $this->addSql('ALTER TABLE typology_category_typology ADD CONSTRAINT FK_816F5C6E3FF28553 FOREIGN KEY (typology_category_id) REFERENCES typology_category (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE typology_category_typology ADD CONSTRAINT FK_816F5C6EC7D98C7A FOREIGN KEY (typology_id) REFERENCES typology (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE typology_category_typology DROP CONSTRAINT FK_816F5C6E3FF28553');
        $this->addSql('ALTER TABLE typology_category_typology DROP CONSTRAINT FK_816F5C6EC7D98C7A');
        $this->addSql('DROP TABLE typology_category');
        $this->addSql('DROP TABLE typology_category_typology');
    }
}
