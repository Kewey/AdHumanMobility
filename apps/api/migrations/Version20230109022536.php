<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230109022536 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE disruption ADD typology_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE disruption ADD category_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE disruption ADD sub_category_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE disruption ADD CONSTRAINT FK_DB672C1CC7D98C7A FOREIGN KEY (typology_id) REFERENCES typology (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE disruption ADD CONSTRAINT FK_DB672C1C12469DE2 FOREIGN KEY (category_id) REFERENCES typology (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE disruption ADD CONSTRAINT FK_DB672C1CF7BFE87C FOREIGN KEY (sub_category_id) REFERENCES typology (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_DB672C1CC7D98C7A ON disruption (typology_id)');
        $this->addSql('CREATE INDEX IDX_DB672C1C12469DE2 ON disruption (category_id)');
        $this->addSql('CREATE INDEX IDX_DB672C1CF7BFE87C ON disruption (sub_category_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE disruption DROP CONSTRAINT FK_DB672C1CC7D98C7A');
        $this->addSql('ALTER TABLE disruption DROP CONSTRAINT FK_DB672C1C12469DE2');
        $this->addSql('ALTER TABLE disruption DROP CONSTRAINT FK_DB672C1CF7BFE87C');
        $this->addSql('DROP INDEX IDX_DB672C1CC7D98C7A');
        $this->addSql('DROP INDEX IDX_DB672C1C12469DE2');
        $this->addSql('DROP INDEX IDX_DB672C1CF7BFE87C');
        $this->addSql('ALTER TABLE disruption DROP typology_id');
        $this->addSql('ALTER TABLE disruption DROP category_id');
        $this->addSql('ALTER TABLE disruption DROP sub_category_id');
    }
}
