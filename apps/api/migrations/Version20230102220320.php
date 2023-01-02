<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230102220320 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE typology_parent (typology_id INT NOT NULL, parent_id INT NOT NULL, PRIMARY KEY(typology_id, parent_id))');
        $this->addSql('CREATE INDEX IDX_57161AB6C7D98C7A ON typology_parent (typology_id)');
        $this->addSql('CREATE INDEX IDX_57161AB6727ACA70 ON typology_parent (parent_id)');
        $this->addSql('ALTER TABLE typology_parent ADD CONSTRAINT FK_57161AB6C7D98C7A FOREIGN KEY (typology_id) REFERENCES typology (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE typology_parent ADD CONSTRAINT FK_57161AB6727ACA70 FOREIGN KEY (parent_id) REFERENCES typology (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE typology_typology DROP CONSTRAINT fk_603860b63512058a');
        $this->addSql('ALTER TABLE typology_typology DROP CONSTRAINT fk_603860b62cf75505');
        $this->addSql('DROP TABLE typology_typology');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE typology_typology (typology_source INT NOT NULL, typology_target INT NOT NULL, PRIMARY KEY(typology_source, typology_target))');
        $this->addSql('CREATE INDEX idx_603860b62cf75505 ON typology_typology (typology_target)');
        $this->addSql('CREATE INDEX idx_603860b63512058a ON typology_typology (typology_source)');
        $this->addSql('ALTER TABLE typology_typology ADD CONSTRAINT fk_603860b63512058a FOREIGN KEY (typology_source) REFERENCES typology (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE typology_typology ADD CONSTRAINT fk_603860b62cf75505 FOREIGN KEY (typology_target) REFERENCES typology (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE typology_parent DROP CONSTRAINT FK_57161AB6C7D98C7A');
        $this->addSql('ALTER TABLE typology_parent DROP CONSTRAINT FK_57161AB6727ACA70');
        $this->addSql('DROP TABLE typology_parent');
    }
}
