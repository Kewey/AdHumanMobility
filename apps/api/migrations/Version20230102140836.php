<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230102140836 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE typology DROP CONSTRAINT fk_1596c8f893cb796c');
        $this->addSql('DROP INDEX idx_1596c8f893cb796c');
        $this->addSql('ALTER TABLE typology RENAME COLUMN file_id TO icon_id');
        $this->addSql('ALTER TABLE typology ADD CONSTRAINT FK_1596C8F854B9D732 FOREIGN KEY (icon_id) REFERENCES media_object (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_1596C8F854B9D732 ON typology (icon_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE typology DROP CONSTRAINT FK_1596C8F854B9D732');
        $this->addSql('DROP INDEX IDX_1596C8F854B9D732');
        $this->addSql('ALTER TABLE typology RENAME COLUMN icon_id TO file_id');
        $this->addSql('ALTER TABLE typology ADD CONSTRAINT fk_1596c8f893cb796c FOREIGN KEY (file_id) REFERENCES media_object (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_1596c8f893cb796c ON typology (file_id)');
    }
}
